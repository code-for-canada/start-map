# StreetARToronto Map

An app for mapping Toronto street art projects.

## :hammer_and_wrench: Technologies Used

- **Google Maps.**
  - [**Javascript API.**][gmaps-js] For customized maps on
  webpages.
  - [**Infobox.**][infobox] Utility library for extending maps with
    themed popups.
- **Javascript.**
  - [**Webpack.**][webpack] Static module bundler for modern JavaScript applications.
  - [**Webpack Bundle Analyzer.**][webpack-analyzer] Visualize size of webpack output files with an interactive zoomable treemap.
  - [**Browsersync.**][browsersync] Free hosted development service for browser testing.
- [**Heroku.**][heroku] Platform for easily deploying applications.
  - [**`heroku-buildpack-static`.**][heroku-buildpack-static] Heroku
    [buildpack][heroku-buildpack] for handling static sites.
    - We use a fork with [a new password-protection feature][basic-auth].

   [browsersyc]: https://www.browsersync.io/
   [webpack]: https://webpack.js.org/concepts/
   [webpack-analyzer]: https://github.com/webpack-contrib/webpack-bundle-analyzer

## :computer: Local Development

See also: Development Notes in [`DEVELOPMENT.md`](/DEVELOPMENT.md)

This is a simple HTML app, and so you can use any local server.

If you don't have one yet, but have Python or NPM installed on your
local system, you can use those from the command line.

The following steps will make the website available at:
http://localhost:8080

**Python**

```
# If Python2 is available
python2 -m SimpleHTTPServer 8080

# If Python3 is available
python3 -m http.server 8080
```

**Node.js / NPM**

```
npm install http-server -g
http-server -p 8080
```

## Heroku Staging Server

To help the team demo and stay on the same page, we host a remote
staging evnrironment running the app: https://cht-start-map.herokuapp.com/

It's password-protected. For access, please contact @patcon or another
member of the development team.

This demo app is automatically synced with the `master` branch
hosted on GitHub. Merging any changes to this branch will automatically
deploy them to the staging environment.

### Managing password-protection

This password-protection only affects Heroku.

Password protection can be enabled as disabled by toggling the
`basic_auth` setting in [`static.json`](static.json).

Password-protection is configured via two environment variables:

- `BASIC_AUTH_USERNAME`: A plaintext username.
  - Ex: `myusername`
- `BASIC_AUTH_PASSWORD`: A string of the "hashed" password.
  - Generate from command-line via `openssl passwd -apr1 testing123`
  - Ex: `$apr1$mBtNMatf$9sIue48ezPSkAsE4m.GNs1`

On Heroku, these environment variables are managed according to [this
documentation][heroku-envvar].

## :copyright: License
[MIT License](https://tldrlegal.com/license/mit-license)

<!-- Links -->
   [gmaps-js]: https://developers.google.com/maps/documentation/javascript/tutorial
   [infobox]: https://github.com/googlemaps/v3-utility-library/tree/master/infobox
   [heroku]: https://www.heroku.com/what
   [heroku-buildpack]: https://devcenter.heroku.com/articles/buildpacks
   [heroku-buildpack-static]: https://github.com/heroku/heroku-buildpack-static
   [basic-auth]: https://github.com/heroku/heroku-buildpack-static/pull/45
   [heroku-envvar]: https://devcenter.heroku.com/articles/config-vars
