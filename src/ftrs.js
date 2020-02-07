const json = require('../ftrs.geojson');
const ftrs = json.features;
let props = [];
for(let i = 0; i < ftrs.length; i++){
    props.push(ftrs[i].properties);
}
const all = props;
export default all;