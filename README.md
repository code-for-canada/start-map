# StreetARToronto Map

An app for mapping Toronto street art projects.

This app is built in **React**, a javascript library for user interfaces. We
use the **`create-react-app`** development framework to have sensible defaults
and development practices that will be familiar to those familiar with React.

## :hammer_and_wrench: Technologies Used

- Development
  - [**Create React App.**][create-react-app] A development tool for easily bootstrapping and managing a ReactJS app with sensible defaults. 
  - [**Source Map Explorer.**][source-map-explorer] Analyze and debug bloat in bundled code.
  - [**Heroku.**][heroku] Platform for easily deploying applications.
    - [**`create-react-app-buildpack`.**][create-react-app-buildpack] Heroku
      [buildpack][heroku-buildpack] for handling React apps like ours.
    - [**Review Apps.**][review-apps] Creates a disposable Heroku app for each GitHub pull request.
  - [**GitHub Actions.**][github-actions] Runs scripts (aka _tasks_ or _actions_ grouped into _workflows_) in the cloud.
- App components
  - **Google Maps.**
    - [**Javascript API.**][gmaps-js] For customized maps on webpages.
  - **Javascript.**
    - [**React.**][react] A JavaScript library for building user interfaces.
    - [**Webpack.**][webpack] Static module bundler for modern JavaScript applications. (Hidden within `create-react-app`.)

For a full inventory of platforms & services used, see [our Platform Inventory GDoc][inventory] (:lock: privileged access only).

   [create-react-app]: https://create-react-app.dev/
   [source-map-explorer]: https://github.com/danvk/source-map-explorer
   [heroku]: https://www.heroku.com/what
   [heroku-buildpack]: https://devcenter.heroku.com/articles/buildpacks
   [create-react-app-buildpack]: https://github.com/mars/create-react-app-buildpack
   [review-apps]: https://devcenter.heroku.com/articles/github-integration-review-apps

   [gmaps-js]: https://developers.google.com/maps/documentation/javascript/tutorial
   [webpack]: https://webpack.js.org/concepts/
   [react]: https://reactjs.org/
   [inventory]: https://docs.google.com/document/d/1xdaF2JfF68RtSS5ajaOQFOfmvwG3YSSxuggum2jj9qc/edit#

## :computer: Local Development

### Setup

```
npm install
```

### Available Scripts

#### `npm run analyze`

Runs `source-map-explorer` so that you can visualize what contributes to the size of your production build.

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint (code style) errors in the console.

#### `npm run lint`

Runs `eslint` styling checks on our code. This helps ensure clean, readable
code that follow specific formatting conventions and can be checked easily.

#### `npm test`

_**Note:** We are currently not writing tests, but plan to soon!_

Launches the test runner in the interactive watch mode.<br />

For general `create-react-app` docs,
see the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

#### `airtable2geojson`

We run an automated script in the cloud via [GitHub Actions][github-actions] that:

1. reads artwork data from our Airtable base,
2. converts it into GeoJSON, and
3. pushes any changes to a file in this repo: [`public/geojson/ftrs.json`](/public/geojson/ftrs.json)

   [github-actions]: https://help.github.com/en/actions/getting-started-with-github-actions/about-github-actions

:clock230: This script runs every hour.

[![Update GeoJSON file from Airtable][badge]][logs]

   [badge]: https://github.com/hyphacoop/start-map/workflows/Update%20GeoJSON%20file%20from%20Airtable/badge.svg
   [logs]: https://github.com/hyphacoop/start-map/actions?query=workflow%3A%22Update+GeoJSON+file+from+Airtable%22

If the badge above is green, it's running successfully. Click the badge to see history of script runs.

(This script has its own README in [`scripts/airtable2geojson`](/scripts/airtable2geojson).)

## Deployment

We use Heroku for deployment. You can see the deployment pipeline here:

![Screenshot of Heroku pipeline](docs/heroku-pipeline-screenshot.png)

We auto-deploy `master` branch for this GitHub repo to the _staging_ environment:
https://streetartto.herokuapp.com/

The staging environment is manually promoted to _production_:
https://streetartpublic.herokuapp.com/

With proper privileges, this promotion can be done via the Heroku pipeline page:
https://dashboard.heroku.com/pipelines/a6596f31-75c3-4c3f-951a-018940150284

Some environment variables (e.g., Google Analytics & Maps) use different
credentials in the production vs staging/development environments. These are
set in the Heroku UI, but see `.env.heroku.*` and `app.json` files for
reference.

For general `create-react-app` docs,
see the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment).

## Metrics

We have the ability to monitor usage of individual features with [Google
Analytics events][ga-events], to understand what's valuable. We keep a separate
production account so as not to clutter up data during testing.

   [ga-events]: https://github.com/react-ga/react-ga#reactgaeventargs

## External Resources

- GDoc: [Platform Inventory][inventory]

## :copyright: License
[MIT License](https://tldrlegal.com/license/mit-license)

<!-- Links -->
   [inventory]: https://docs.google.com/document/d/1xdaF2JfF68RtSS5ajaOQFOfmvwG3YSSxuggum2jj9qc/edit
