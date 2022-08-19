// Source: https://github.com/digidem/airtable-github-export
var Airtable = require('airtable')
var parallel = require('run-parallel')
var Hubfs = require('hubfs.js')
var geojsonhint = require('@mapbox/geojsonhint')
var deepEqual = require('deep-equal')
var rewind = require('@mapbox/geojson-rewind')
var debug = require('debug')('airtable-github-export')
var stringify = require('json-stable-stringify')
var fs = require('fs')

require('dotenv').config()

var config = {
  tables: process.env.TABLES.split(','),
  githubToken: process.env.GITHUB_TOKEN,
  repo: process.env.GITHUB_REPO,
  owner: process.env.GITHUB_OWNER,
  airtableToken: process.env.AIRTABLE_API_KEY,
  base: process.env.AIRTABLE_BASE_ID,
  branches: process.env.GITHUB_BRANCH ? process.env.GITHUB_BRANCH.split(',') : ['master'],
  drop_thumbnail_types: process.env.AIRTABLE_DROP_THUMBNAIL_TYPES ? process.env.AIRTABLE_DROP_THUMBNAIL_TYPES.split(',') : [],
  filename: process.env.GITHUB_FILENAME || 'data.json'
}

var CREATE_MESSAGE = '[AIRTABLE-GITHUB-EXPORT] create ' + config.filename
var UPDATE_MESSAGE = '[AIRTABLE-GITHUB-EXPORT] update ' + config.filename

var hubfsOptions = {
  owner: config.owner,
  repo: config.repo,
  auth: {
    token: config.githubToken
  }
}

var gh = config.githubToken ? Hubfs(hubfsOptions) : null

var base = new Airtable({apiKey: config.airtableToken}).base(config.base)

var output = {}

var tasks = config.tables.map(function (tableName) {
  return function (cb) {
    var data = []
    // Ensure properties of output are set in the same order
    // otherwise they are set async and may change order, which
    // results in unhelpful diffs in Github
    output = null

    // If not sorted, then results order is arbitrary.
    // See: https://airtable.com/appZP0zBxvHoqgOLB/api/docs#javascript/table:info:list
    var selectParams = {
      fields: [
        "uid",
        "display_title",
        "featured_media",
        "description",
        "address",
        "ward",
        "program_name",
        "year",
        "themes",
        "artist_public_name",
        "artist_bio",
        "artist_website",
        "status",
        "canvas",
        "medium",
        "organization_names",
        "latitude",
        "longitude"
      ],
      filterByFormula: "status = 'Published'",
      sort: [
        { field: "uid", direction: "asc" },
      ]
    }

    base(tableName).select(selectParams).eachPage(page, done)

    function getField (record, field) {
      const value = record.get(field)
      return (value && typeof(value) === "object") ? value.join(', ') : value
    }

    function page (records, next) {
      // This function will get called for each page of records.
      records.forEach(function (record) {
        var feature = {
          type: 'Feature',
          id: record._rawJson.fields.uid,
          properties: {
            uid: getField(record, 'uid'),
            title: getField(record, 'display_title'),
            media: record.get('featured_media'),
            description: getField(record, 'description'),
            address: getField(record, 'address'),
            ward: getField(record, 'ward'),
            program: getField(record, 'program_name'),
            year: getField(record, 'year'),
            themes: getField(record, 'themes'),
            artist: getField(record, 'artist_public_name'),
            artist_bio: getField(record, 'artist_bio'),
            artist_website: getField(record, 'artist_website'),
            status: getField(record, 'status'),
            canvas: getField(record, 'canvas'),
            medium: getField(record, 'medium'),
            organizations: getField(record, 'organization_names'),
          }
        }

        var latitude = record.get('latitude')
        var longitude = record.get('longitude')

        if (latitude && longitude) {
          feature.geometry = {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          }
        } else {
          feature.geometry = null
        }
        // Manipulate media field values
        // Reverse media array so that order matches Airtable UI order.
        if (feature.properties.media) {
          feature.properties.media = feature.properties.media.reverse()
        }
        // Drop some thumbnail types to conserve data in sending geojson.
        if (feature.properties.media) {
          feature.properties.media.forEach( (attachment) => {
            switch (attachment.type.split('/')[0]) {
              case 'image':
                config.drop_thumbnail_types.forEach( (type) => {
                  delete attachment.thumbnails[type]
                })
                break
              case 'video':
              case 'audio':
                // No-op
                break
              default:
                console.debug('Media attachment found that is not image/audio/video:')
                console.debug(attachment)
            }
          })
        }
        // change all urls to point to googleapis instead of airtable:
        if (feature.properties.media) {
          feature.properties.media = feature.properties.media.map(modifyUrls);
        }
        // Drop some properties we don't use.
        // delete feature.properties.old_ward
        data.push(feature)
      })
      next()
    }

    function done (err) {
      if (err) return cb(err)
      var featureCollection = {
        type: 'FeatureCollection',
        crs: {
          "type": "name",
          "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
          }
        },
        features: data
      }
      output = featureCollection
      cb()
    }
  }
})

parallel(tasks, function (err, result) {
  if (err) return onError(err)
  // Write only to local file if no GitHub token specified.
  if (gh === null) {
    data = stringify(output, { replacer: null, space: 2 })
    // Write to file relative to package.json file in subdir
    fs.writeFile(config.filename, data, function (err) {
      if (err) return console.log(err)
      console.log('> ' + config.filename)
    })
    return
  }
  gh.readFile(config.filename, {ref: config.branches[0]}, function (err, data) {
    if (err) {
      if (!(/not found/i.test(err) || err.notFound)) {
        return onError(err)
      }
    } else {
      data = JSON.parse(data)
    }
    if (data && deepEqual(data, output)) {
      return debug('No changes from Airtable, skipping update to Github')
    }
    var message = data ? UPDATE_MESSAGE : CREATE_MESSAGE
    ghWrite(config.filename, output, config.branches, message, function (err) {
      if (err) return onError(err)
      debug('Updated ' + config.owner + '/' + config.repo + '/' + config.filename +
        ' with latest changes from Airtable')
    })
  })
})

function ghWrite (filename, data, branches, message, cb) {
  var pending = branches.length
  branches.forEach(function (branch) {
    var opts = {
      message: message,
      branch: branch
    }
    gh.writeFile(filename, stringify(data, { replacer: null, space: 2 }), opts, done)
  })
  function done (err) {
    if (err) return cb(err)
    if (--pending > 0) return
    cb()
  }
}

function onError (err) {
  console.error(err)
  process.exit(1)
}

function modifyUrls(mediaObj) {
  mediaObj.url = swapUrlSource(mediaObj.url);
  Object.keys(mediaObj.thumbnails).forEach((size) => {
    mediaObj.thumbnails[size].url = swapUrlSource(
      mediaObj.thumbnails[size].url
    );
  });
  return mediaObj;
}

const bucketPrefix =
  "https://firebasestorage.googleapis.com/v0/b/torontoartfiles.appspot.com/o/";
function swapUrlSource(url) {
  const parts = url.match(/http.*attachment[^\/]*\/([^?]*)/);
  let filename = parts && parts[1].replace(/\//g, "%2F");
  if (filename.indexOf(".") === -1) {
    filename = filename + ".jpeg";
  }
  return bucketPrefix + filename + "?alt=media";
}

// Case insensitive record.get
function get (record, fieldName) {
  if (typeof record.get(fieldName) !== 'undefined') {
    return record.get(fieldName)
  } else if (typeof record.get(fieldName.charAt(0).toUpperCase() + fieldName.slice(1)) !== 'undefined') {
    return record.get(fieldName.charAt(0).toUpperCase() + fieldName.slice(1))
  } else if (typeof record.get(fieldName.toUpperCase()) !== 'undefined') {
    return record.get(fieldName.toUpperCase())
  }
}

// Try to parse a geometry field if it is valid GeoJSON geometry
function parseGeometry (geom) {
  if (!geom) return null
  try {
    geom = rewind(JSON.parse(geom))
  } catch (e) {
    return null
  }
  var errors = geojsonhint.hint(geom)
  if (errors && errors.length) return null
  return geom
}

// Check whether coordinates are valid
function parseCoords (coords) {
  if (typeof coords[0] !== 'number' || typeof coords[1] !== 'number') return null
  if (coords[0] < -180 || coords[0] > 180 || coords[1] < -90 || coords[1] > 90) return null
  return coords
}
