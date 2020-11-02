import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import { render } from "react-dom";
import runtimeEnv from '@mars/heroku-js-runtime-env';

import App from "./lib/components/App";
import * as serviceWorker from './serviceWorker';

const env = runtimeEnv()

render(
  <App
    googleApiKey={env.REACT_APP_GOOGLE_MAPS_API_KEY}
    featuresDataSource={'geojson/ftrs.json'}
    wardsDataSource={'geojson/wards.json'}
  />, document.getElementById("map-root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWAY

serviceWorker.unregister();
