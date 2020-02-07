// Needed to include this is src for compilation, as well as in
// public/geojson/ftrs.json
// TODO: Figure out how to load data via http request.
import json from './ftrs.json';

const ftrs = json.features;
let props = [];
for(let i = 0; i < ftrs.length; i++){
    props.push(ftrs[i].properties);
}
const all = props;
export default all;
