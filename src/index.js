import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
// See: https://create-react-app.dev/docs/adding-bootstrap/
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectAll from "./sa.js";
import { default as ReactSelect } from 'react-select';
import DynamicSlides from "./slides.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyLoad from 'react-lazyload';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.css';
import sort from 'fast-sort';
import logo from './assets/logo.svg';

import markerBlue from './assets/marker-blue.svg';
import markerRed from './assets/marker-red.svg';
import markerGreen from './assets/marker-green.svg';
import markerYellow from './assets/marker-yellow.svg';
import markerBlueL from './assets/marker-blue-l.svg';
import markerRedL from './assets/marker-red-l.svg';
import markerGreenL from './assets/marker-green-l.svg';
import markerYellowL from './assets/marker-yellow-l.svg';
import locator from './assets/locate.png';
import placeholder from './assets/placeholder.jpg';

import * as serviceWorker from './serviceWorker';

let map
let li
let mapFtr = 0
class BetaBanner extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
        let banner;

        if (this.props.mobile === true) {
            banner = <div className="beta-banner-mobile">
            <h6 className="beta-text-mobile">
                Beta
            </h6>
        </div>
        }
        else{
            banner = <div className="beta-banner">
            <h6 className="beta-text">
                Beta
            </h6>
        </div>
        }
        return (
            <div className="banner-wrapper">
                {banner}
            </div>
        )
    }
}
class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.click()
    }
    render () {
        const settings = {
            dots: true,
            infinite: false,
            lazyLoad: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
          };
        let splash;
        if (this.props.mobile === true){
            splash = 
            <div className="splash-background">
            <div className="splash-mobile">
                <div className="splash-head">
                    <h3>Welcome to</h3>
                    <h1>StreetARToronto – The Map!</h1>
                    <h6>A joint project of StreetARToronto (StART) and Civic Hall Toronto</h6>
                </div>
                <Slider {...settings}>
                    <div>
                        <p>Toronto is home to some of the best mural, street and graffiti artists and art in the world. These artists and artworks have transformed Toronto&#39;s public streets, laneways and parks into a city-wide art gallery!</p> 
                    </div>
                    <div>
                        <p>This map based app will help you explore the amazing street art located throughout the city. The current database provides a sampling of murals created as part of the
                    StreetARToronto suite of programs from 2012 to 2018. In addition to identifying the
                    artist and arts organization responsible for painting the mural the database describes
                    the stories and themes behind each unique and beautiful artwork. Individually and
                    collectively these murals are designed to celebrate the City of Toronto motto &quot;Diversity Our Strength&quot; and foster a greater sense of belonging among all.</p>
                    </div>
                    <div>
                        <p>Filters allow you to search by any combination of Year and/or Ward. Additional filters will be installed and the database is being updated regularly to add more artwork, so check back often!</p>
                    </div>
                </Slider>

                <div className="splash-button-wrap">
                <button aria-label="Close" onClick={this.handleClick} className="splash-btn btn btn-light">
                    Get Started!
                </button>
            </div>
              
            </div>   
            </div>
        }
        else {
            splash = <div className="splash-background"><div className="splash">
            <div className="splash-head">
                <h3>Welcome to</h3>
                <h1>StreetARToronto – The Map!</h1>
                <h6>A joint project of StreetARToronto (StART) and Civic Hall Toronto</h6>
            </div>
            <div className="splash-body">
                <p>Toronto is home to some of the best mural, street and graffiti artists and art in the world. These artists and artworks have transformed Toronto&#39;s public streets, laneways and parks into a city-wide art gallery!</p>
                <p>This map based app will help you explore the amazing street art located throughout the city. The current database provides a sampling of murals created as part of the
                StreetARToronto suite of programs from 2012 to 2018. In addition to identifying the
                artist and arts organization responsible for painting the mural the database describes
                the stories and themes behind each unique and beautiful artwork. Individually and
                collectively these murals are designed to celebrate the City of Toronto motto &quot;Diversity Our Strength&quot; and foster a greater sense of belonging among all.</p>
                <p>Filters allow you to search by any combination of Year and/or Ward. Additional filters will be installed and the database is being updated regularly to add more artwork, so check back often!</p>
            </div>
            <div className="splash-button-wrap">
                <button aria-label="Close" onClick={this.handleClick} className="splash-btn btn btn-light">
                    Get Started!
                </button>
            </div>
            
            </div></div>
        }
        return (
            <div className="splash-wrapper">
                {splash}
            </div>
            
        );
    }
}
const yroptions = [{
        value: '2012',
        label: '2012'
    },
    {
        value: '2013',
        label: '2013'
    },
    {
        value: '2014',
        label: '2014'
    },
    {
        value: '2015',
        label: '2015'
    },
    {
        value: '2016',
        label: '2016'
    },
    {
        value: '2017',
        label: '2017'
    },
    {
        value: '2018',
        label: '2018'
    }
];
let yrs = yroptions
class Years extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange = inputValue => {
        this.props.yrsFilter(inputValue);
        yrs = inputValue;

    };

    render() {
        return (
            <SelectAll
              closeMenuOnSelect={false}
              isMulti={true}
              defaultValue={yroptions}
              value={this.props.selected}
              onChange={this.onChange}
              allowSelectAll={true}
              options = {yroptions}
              className={"drp"}
            />
        );
    }
}

const wrdoptions = [
    {
        value: '1',
        label: '1 – Etobicoke North'
    },
    {
        value: '2',
        label: '2 – Etobicoke Centre'
    },
    {
        value: '3',
        label: '3 – Etobicoke-Lakeshore'
    },
    {
        value: '4',
        label: '4 – Parkdale-High Park'
    },
    {
        value: '5',
        label: '5 – York-South Weston'
    },
    {
        value: '6',
        label: '6 – York Centre'
    },
    {
        value: '7',
        label: '7 – Humber River-Black Creek'
    },
    {
        value: '8',
        label: '8 – Eglinton-Lawrence'
    },
    {
        value: '9',
        label: '9 – Davenport'
    },
    {
        value: '10',
        label: '10 – Spadina-Fort York'
    },
    {
        value: '11',
        label: '11 – University-Rosedale'
    },
    {
        value: '12',
        label: '12 – Toronto-St. Paul’s'
    },
    {
        value: '13',
        label: '13 – Toronto Centre'
    },
    {
        value: '14',
        label: '14 – Toronto-Danforth'
    },
    {
        value: '15',
        label: '15 – Don Valley West'
    },
    {
        value: '16',
        label: '16 – Don Valley East'
    },
    {
        value: '17',
        label: '17 – Don Valley North'
    },
    {
        value: '18',
        label: '18 – Willowdale'
    },
    {
        value: '19',
        label: '19 – Beaches-East York'
    },
    {
        value: '20',
        label: '20 – Scarborough Southwest'
    },
    {
        value: '21',
        label: '21 – Scarborough Centre'
    },
    {
        value: '22',
        label: '22 – Scarborough-Agincourt'
    },
    {
        value: '23',
        label: '23 – Scarborough North'
    },
    {
        value: '24',
        label: '24 – Scarborough-Guildwood'
    },
    {
        value: '25',
        label: '25 – Scarborough-Rouge Park'
    }
];
let wrds = wrdoptions
class Wards extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
         selectedOption: this.props.selected
     };
    }
    handleChange = (selectedOption) => {
    
        this.props.wrdsFilter(selectedOption);
        wrds = selectedOption
    };

    render() {
        const {
            selectedOption
        } = this.state;
        return (
            <SelectAll
              closeMenuOnSelect={false}
              isMulti = {true}
              allowSelectAll = {true}
            onChange = {this.handleChange}
            value={this.props.selected}
            defaultValue={this.state.selectedOption}
            options = {wrdoptions}
            className={"drp"}
            />
        );
    }

};

const prgrmoptions = [{
    value: "Partnership Program",
    label: "Partnership Program",
    color: '#245C95'
},
{
    value: "Outside the Box",
    label: "Outside the Box",
    color: '#B72941'
},
{
    value: "StART Support",
    label: "StART Support",
    color: '#007F2E'
},
{
    value: "Other",
    label: "Other",
    color: '#CFB51D'
}];
let prgrms = prgrmoptions
class Programs extends React.Component {
constructor(props) {
    super(props);
}
onChange = inputValue => {
    this.props.prgrmFilter(inputValue);
    prgrms = inputValue;

};

render() {
    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          const color = data.color;
          return {
            ...styles,
           
            color: isDisabled
              ? '#ccc'
              : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
          };
        },
       
        multiValueLabel: (styles, { data }) => ({
          ...styles,
          color: data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
          ...styles,
          color: data.color,
          ':hover': {
            backgroundColor: data.color,
            color: 'white',
          },
        }),
      }
    return (
        <SelectAll
          closeMenuOnSelect={false}
          isMulti={true}
          defaultValue={prgrmoptions}
          value={this.props.selected}
          onChange={this.onChange}
          allowSelectAll={true}
          options = {prgrmoptions}
          className={"drp"}
          styles={colourStyles}
        />
    );
}
}

class WardToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: this.props.state};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.click(this.state.isToggleOn);
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick} className="btn btn-light">
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
const sortoptions = [{
    value: "1",
    label: "Artist: A-Z"
},
{
    value: "2",
    label: "Artist: Z-A"
},
{
    value: "3",
    label: "Year: Low to High "
},
{
    value: "4",
    label: "Year: High to Low"
}];
class SortDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange = inputValue => {
        this.props.setSortMethod(inputValue.value);
    };    
    render() {
        return(
            <ReactSelect
            closeMenuOnSelect={false}
            isMulti={false}
            isClearable
            onChange={this.onChange}
            options = {sortoptions}
            defaultValue={sortoptions[0]}
            className={"sortDrp"}
            />
        )
    }
}
class BackToListViewButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.click // eslint-disable-line
    }
    render() {
        return (
          <button aria-label="Back" id="back" onClick={this.handleClick} type="button" className="btn btn-light"> ← Back </button>
        );
    }
}
class ToggleViewButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {isToggleOn: this.props.state};
    }
    handleClick() {
        this.props.click(this.state.isToggleOn);
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <div className="tglview">
                <button onClick={this.handleClick} className="btn btn-light">
                    {this.state.isToggleOn ? 'Map' : 'List'}
                </button>
            </div>

        );
    }
}
class MobileFilterViewButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.click(true)
    }
    render() {
        let filterBubble
        if (this.props.filtered){
            filterBubble = <div id="filterBubble"></div>
        }
        return (
            <div className="tglview">
                {filterBubble}
                <button aria-label="Filter View" id="filterviewmobile" onClick={this.handleClick} type="button" className="btn btn-light">Filter</button>
            </div>

        );
    }
}
class GeolocateButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.click()
    }
    render() {
        return (
            <div className="tglview">
                <button aria-label="Center map on your location" id="geolocate" onClick={this.handleClick} type="button" className="btn btn-light"><img aria-label="Geolocate" id="geoImg" src={locator}/></button>
            </div>

        );
    }
}

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.selectedChange(this.props.uid)
    }

    render() {
        let f;
        if (this.props.imgid[0]){
            f = process.env.REACT_APP_IMAGE_URL_PREFIX + this.props.imgid[0] + ".jpg";
        } else {
            f = placeholder
        }
        return (
            
            <a href="#" className='lv-tile' onClick={this.handleClick}>
                    <LazyLoad height={100} offset={30} overflow={true} resize={true}>
                        <div className='lv-tile-pic'>
                            <img aria-label="Thumbnail Preview" className="list-img" src={f} onError={(e)=>{e.target.onerror = null; e.target.src=placeholder}}/>
                        </div>
                    </LazyLoad>
                    <div className="lv-tile-txt">
                        <h5 className='tileArtist'>
                        {this.props.artistName}
                        </h5>
                        <p className='tileAddress'>
                            {this.props.address}
                        </p>
                        <p className='tileYear'>
                            {this.props.year}
                        </p>
                    </div>
         
            </a>
           
        );
    }
}
class FtrList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let ftrs = this.props.ftrs
        return (
            <div id="list">
                {ftrs.map(f =>
                    <ListItem
                        key={f.uid}
                        uid={f.uid}
                        artistName={f.artist}
                        address={f.address}
                        year={f.yr}
                        imgid={f.img_code}
                        selectedChange={this.props.selectedChange}
                    />
                )}
            </div>
        )
    }
}
class Detail extends React.Component {
    constructor(props){
        super(props);
        this.getImgCodes = this.getImgCodes.bind(this);
        this.state = {
            ftr: this.props.ftr.getProperty('uid')
        };
    }

    getImgCodes(sel){
        let imgs = [];
        if (sel.g && sel.g.getType() === "Point") {
            let f = sel.getProperty('img_code')
            for (var i = 0; i < f.length; i++) {
                let img = process.env.REACT_APP_IMAGE_URL_PREFIX + f[i] + ".jpg";
                imgs.push({"key": sel.getProperty('uid')+ "-" + i, "img":img})
            } 
            if (f.length === 0) {
                let img = placeholder
                imgs.push({"key": sel.getProperty('uid'), "img":img}) 
            }

        }
        return imgs;
    }
    render(){
        const s = this.props.uid
        const sel = this.props.ftr

        let view;
        if (sel.g && sel.g.getType() === "Point") {

            view = <div><div className="detailSlideshow" aria-label="Images of the artwork">
                <DynamicSlides ftr={sel} slides={this.getImgCodes(sel)} onError={(e)=>{e.target.onerror = null; e.target.src=placeholder}}/>
            </div>
            <div id="detailText">
                <h3 className='detailArtist'>
                    {sel.getProperty('artist')}
                </h3>
                <h5 className='detailAddress'>
                    {sel.getProperty('address')}
                </h5>
                <h5 className='detailYear'>
                    Created in {sel.getProperty('yr')}
                </h5>
                <br/>
                <p className='detailOrg'>
                    <strong>Partner Organization:</strong> {sel.getProperty('partner')}
                </p>
                <p className='detailDesc'>
                    <strong>Description:</strong> {sel.getProperty('description')}
                </p>
                <p className='detailWard'>
                    <strong>Ward:</strong> {sel.getProperty('ward')}
                </p>
                <p className='detailPrgrm'>
                    <strong>Program:</strong> {sel.getProperty('prgrm')}
                </p>
            </div></div>
        } else {
            wrds = wrdoptions;
            this.props.click; // eslint-disable-line
            view = <div><h3 className='detailWard'>
                Ward {sel.getProperty('AREA_L_CD')} <br/>
                {sel.getProperty('AREA_NAME')}
            </h3>
            
            </div>


        }


        return (
            <div className="detailView">

            {view}

            </div>
        )
    }
}
var icons = {
    "Partnership Program": {
      icon: markerBlue
    },
    "Outside the Box": {
      icon: markerRed
    },
    "StART Support": {
      icon: markerGreen
    },
    "Other": {
      icon: markerYellow
    }
  };
  var iconsLarge = {
    "Partnership Program": {
      icon: markerBlueL
    },
    "Outside the Box": {
      icon: markerRedL
    },
    "StART Support": {
      icon: markerGreenL
    },
    "Other": {
      icon: markerYellowL
    }
  };
class GMap extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          oldSelected: 1
      }
      this.getFtr = this.getFtr.bind(this);
    }
     static propTypes() {
  	
  }
    render() {
        return(
        <div id='map' ref="map">
        </div>)
    }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap();
    this.state.map = this.map;
    this.map.data.loadGeoJson('geojson/ftrs.json', { idPropertyName: 'uid' })
    this.map.data.loadGeoJson('geojson/wards.json', { idPropertyName: 'AREA_ID' })

    window.google.maps.event.addListener(this.map.data, 'click', (e)=> this.handleFtrClick(e));

    // this.map.data.setStyle(function(feature){
    //     var geo = feature.getGeometry();
        
    //     var type = ""
    //     if (geo) {
    //         type = geo.getType();
    //     }

    //     if (type === "MultiPolygon") {
    //         return({
    //             visible: false,
    //             fillColor: 'Navy',
    //             strokeWeight: 2
    //         });
    //     } else {
    //         return ({
    //             icon:'/marker-3-l.png',
    //             visible: true,
    //         });
    //     }
        
     //})
  }

  

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    window.google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      center: {
          lat: 43.6790637,
          lng: -79.4324065
      },
      zoom: 13,
      mapTypeControl: false,
      fullscreenControl: false,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    }
    return new window.google.maps.Map(this.refs.map, mapOptions)
  }
   filterMap(yrs, wrds, prgrms) {
       li = []
       //this.map.data.revertStyle();
       
       const m = this.map.data
       this.map.data.forEach(function(feature) {
           let keep1 = false;
           let keep2 = false;
           let keep3 = false;

           for (let i = 0; i < yrs.length; i++) {
               if (feature.getProperty('yr') && feature.getProperty('yr').toString() === yrs[i].value.toString()) {
                   keep1 = true;
               }
           }
           for (let i = 0; i < wrds.length; i++) {
               if (feature.getProperty('ward') && feature.getProperty('ward').toString() === wrds[i].value.toString()) {
                   keep2 = true;
               }
           }
           for (let i = 0; i < prgrms.length; i++) {
            if (feature.getProperty('prgrm') && feature.getProperty('prgrm').toString() === prgrms[i].value.toString()) {
                keep3 = true;
            }
        }
           let geo = feature.getGeometry();
           if (geo && geo.getType() && geo.getType() === 'Point') {
               if (keep1 && keep2 && keep3) {
                   m.overrideStyle(feature, {
                       visible: true
                   });
                   let l = { 'key': feature.getProperty('uid').toString(),
                   "uid": feature.getProperty('uid'),
                   "artist": feature.getProperty('artist'),
                   'yr': feature.getProperty('yr'),
                   'address': feature.getProperty('address'),
                   "img_code": feature.getProperty("img_code")}
                   li.push(l);
               } else{
                   m.overrideStyle(feature, {
                       visible: false
                   });
               }
           } else {

           }



       })

   }
    handleFtrClick(e){
            console.log(e)
            if (e.feature && e.feature.g.getType() === "Point") {
                var prgrm = e.feature.getProperty('prgrm');
                if (prgrm !== "Partnership Program" && prgrm !==  "Outside the Box" && prgrm !==  "StART Support"){
                    e.feature.setProperty('prgrm', "Other");
                };
                if (this.state.oldSelected == 1){
                    this.map.data.revertStyle(this.state.oldSelected);
                } else if (this.state.oldSelected.g.getType() === "Point"){
                    this.map.data.revertStyle(this.state.oldSelected);
                } else if (this.state.oldSelected.g.getType() === "MultiPolygon") {
                    this.map.data.overrideStyle(this.state.oldSelected, {
                        visible: true,
                        fillColor: 'DarkGray',
                        strokeColor: "Gray",
                        strokeWeight: 2
                    });
                }
                
                this.filterMap(yrs, wrds, prgrms);               
                this.setState({
                    oldSelected: e.feature
                });
                this.map.data.overrideStyle(e.feature, {
                    icon: iconsLarge[prgrm].icon
                });
                let l = e.feature.getProperty('uid');
                {
                this.props.selectedChange(l, e.feature);
                }
                
                
            } else if (e.g && e.g.getType() === "Point") { //for zooming in on a point when a tile in the list is clicked
                var prgrm = e.getProperty('prgrm');
                if (prgrm !== "Partnership Program" && prgrm !==  "Outside the Box" && prgrm !==  "StART Support"){
                    e.feature.setProperty('prgrm', "Other");
                };
                this.map.data.revertStyle(this.state.oldSelected);
                this.setState({
                    oldSelected: e
                });
                
                this.map.data.overrideStyle(e, {
                      icon: iconsLarge[prgrm].icon
                });
                this.map.panTo(e.getGeometry().g)
                this.map.setZoom(18);
                return;
            }  else {
            this.map.data.overrideStyle(this.state.oldSelected, {
                        visible: true,
                        fillColor: 'DarkGray',
                        strokeColor: "Gray",
                        strokeWeight: 2
                    });
                }
            
            this.setState({
                oldSelected: e.feature
            });
            let l = e.feature.getProperty('AREA_ID');
            this.props.selectedChange(l, e.feature);
            this.map.data.overrideStyle(e.feature, {
                        fillColor: 'LightBlue',
                        strokeColor: "MidnightBlue",
                        strokeWeight: 3
                    });
        
    };
       

    geolocation(){
        const m = this.map
          if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        let pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        m.setCenter(pos);
                        m.setZoom(18);
                    }, function() {
                        handleLocationError(true, m.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, m.getCenter());
                }

                function handleLocationError(browserHasGeolocation, pos) {

                }

    }
    getFtr(uid) {
        return this.map.data.getFeatureById(uid)
    }
    mobileMap() {
        //this.map.data.setStyle({icon: '/marker-3-xl.png',visible: true})
        this.map.data.setStyle(function(feature){
            var geo = feature.getGeometry();
            var prgrm = feature.getProperty('prgrm');
            if (prgrm !== "Partnership Program" && prgrm !==  "Outside the Box" && prgrm !==  "StART Support"){
                feature.setProperty('prgrm', "Other");
                prgrm = "Other";
            };
            var type = "";
            if (geo) {
                type = geo.getType();
            }
    
            if (type === "MultiPolygon") {
                return({
                    visible: false,
                    fillColor: 'DarkGray',
                    strokeColor: "Gray",
                    strokeWeight: 2
                });
            } else {
                return ({
                    icon: icons[prgrm].icon,
                    visible: true
                });
            }
            
        })
        this.map.setOptions({zoomControl:false, streetViewControl:false})
        
    }
    desktopMap() {
        //this.map.data.setStyle({icon: '/marker-3-l.png',visible: true})
        
        this.map.data.setStyle(function(feature){
            var geo = feature.getGeometry();
            var prgrm = feature.getProperty('prgrm');
            if (prgrm !== "Partnership Program" && prgrm !==  "Outside the Box" && prgrm !==  "StART Support"){
                feature.setProperty('prgrm', "Other");
                prgrm = "Other";
            };
            var type = "";
            if (geo) {
                type = geo.getType();
            }
    
            if (type === "MultiPolygon") {
                return({
                    visible: false,
                    fillColor: 'DarkGray',
                    strokeColor: "Gray",
                    strokeWeight: 2
                });
            } else {
                return ({
                    icon: icons[prgrm].icon,
                    visible: true
                });
            }
            
        })
        this.map.setOptions({zoomControl:true, streetViewControl:true}) 
    }
    resetMap() {
        this.map.panTo({lat: 43.698035, lng:-79.4564065});
        this.map.setZoom(12);
    }
    wardLayer(bool){
        const m = this.map.data;
        if (!bool) {
            this.map.data.forEach(function(feature){
                var geo = feature.getGeometry();
                var type = ""
                if (geo) {
                    type = geo.getType();
                }
                if (type === "MultiPolygon") {
                    m.overrideStyle(feature, {
                        visible: true
                    });
                }
            })

        }
        else {
            this.map.data.forEach(function(feature){
                var geo = feature.getGeometry();
                var type = ""
                if (geo) {
                    type = geo.getType();
                }
                if (type === "MultiPolygon") {
                    m.overrideStyle(feature, {
                        visible: false
                    });
                }
            })
            
        }
    }
}

class App extends React.Component {

    constructor(props){
        super(props);
        this.triggerTileClick = this.triggerTileClick.bind(this);
        this.triggerMapClick = this.triggerMapClick.bind(this);
        this.triggerBackToListViewButton = this.triggerBackToListViewButton.bind(this);
        this.seeFilterViewMobile = this.seeFilterViewMobile.bind(this);
        this.seeListViewMobile = this.seeListViewMobile.bind(this);
        this.getImgId = this.getImgId.bind(this);
        this.yearsFilter = this.yearsFilter.bind(this);
        this.wardsFilter = this.wardsFilter.bind(this);
        this.programsFilter = this.programsFilter.bind(this);
        this.sortList = this.sortList.bind(this);
        this.setSortMethod = this.setSortMethod.bind(this);
        this.wardLayer = this.wardLayer.bind(this);
        this.triggerGeo = this.triggerGeo.bind(this);
        this.closeSplash = this.closeSplash.bind(this);
        this.state = {
            visFtrs: [],
            listView: true,
            selected: 4,
            ftr:{},
            filtered: false,
            years: yrs,
            wards: wrds,
            programs: prgrms,
            mobileView: window.innerWidth <= 1024,
            detailViewMobile: false,
            filterViewMobile: false,
            listViewMobile: false,
            wardLayer: false,
            splashVis: true,
            sortMethod: 1
        }
    }
    componentDidMount(){
        this.fetchFeatures();
        if (this.state.mobileView) {
            this.refs.filter.mobileMap();
        }
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
        this.sortList(this.state.sortMethod)
    }

    fetchFeatures() {
        fetch('geojson/ftrs.json').then(
          response => response.json()
        ).then(
          json => {
            this.setState({visFtrs: json.features.map(f => f.properties) });
          }
        );
    }
    resize() {
        this.setState({
            mobileView: window.innerWidth <= 1024
        });
        if (this.state.mobileView) {
            this.refs.filter.mobileMap();
            
        } else {
            this.refs.filter.desktopMap();
        }
    }
    closeSplash = () => {
        this.setState({
            splashVis: false
        })
    }
    seeDetail = () =>{
        this.setState({
            detailViewMobile: true
        });
    }
    triggerFilterMap(yrs, wrds, prgrms) {
        this.refs.filter.filterMap(yrs, wrds, prgrms);
        this.refs.filter.resetMap();
        this.setState({
            visFtrs:li
        });
        this.sortList(this.state.sortMethod);
        
    }
    yearsFilter(selected) {
        this.setState({
            years: selected
        })
        this.triggerFilterMap(selected, this.state.wards, this.state.programs)
        this.checkFiltered(selected, this.state.wards, this.state.programs)
        this.sortList(this.state.sortMethod);
    }
    wardsFilter(selected) {
        this.setState({
            wards: selected
        })
        this.triggerFilterMap(this.state.years, selected, this.state.programs)
        this.checkFiltered(this.state.years, selected, this.state.programs)
        this.sortList(this.state.sortMethod);
    }
    programsFilter(selected) {
        this.setState({
            programs: selected
        })
        this.triggerFilterMap(this.state.years, this.state.wards, selected)
        this.checkFiltered(this.state.years, this.state.wards, selected)
        this.sortList(this.state.sortMethod);
    }
    checkFiltered (yrs, wrds, prgrms) {
        if (yrs.length < yroptions.length || wrds.length < wrdoptions.length || prgrms.length < prgrmoptions.length){
            this.setState({
                filtered:true
            });
        }
        else {
            this.setState({
                filtered:false
            });
        }
    }
    wardLayer(bool) {
        this.setState(prevState =>({wardLayer:!prevState.wardLayer}))
        this.refs.filter.wardLayer(bool);
        
    }
    setSortMethod(selected){
        this.setState({
            sortMethod: Number(selected)
        })
        this.sortList(Number(selected))
    }
    sortList(selected) {
        let ftrs = this.state.visFtrs
        if (selected === 1){
            sort(this.state.visFtrs).asc(u => u.artist)
        }
        else if (selected === 2){
            sort(this.state.visFtrs).desc(u => u.artist)
        }
        else if (selected === 3){
            sort(this.state.visFtrs).asc(u => u.yr)
        }
        else if (selected === 4) {
            sort(this.state.visFtrs).desc(u => u.yr)
        }
    
    }
    triggerGeo(){
        this.refs.filter.geolocation();
    }
    triggerMapClick(selected, ftr) {
        this.setState({
            listView: false,
            ftr: ftr,
            selected: selected
        });

        // if (this.state.ftr.g.getType() === "MultiPolygon") {
        //     let label = this.state.ftr.getProperty('AREA_S_CD') + "–" + this.state.ftr.getProperty('AREA_NAME');
        //     wrds = [{value:this.state.ftr.getProperty('AREA_S_CD'),
        //     label: label}];
        //     this.setState({
        //         wards: wrds
        //     });
        //     this.triggerFilterMap;
        // }
    }
    triggerTileClick(selected) {
        let ftr = this.refs.filter.getFtr(selected)

        this.setState({
            listView: false,
            ftr: ftr,
            selected: selected
        });
        this.refs.filter.handleFtrClick(this.refs.filter.getFtr(selected))
        if (this.state.mobileView){
            this.state.detailViewMobile = true
        }


    }
    triggerBackToListViewButton = () => {
        if (this.state.detailViewMobile) {
            this.setState({
                detailViewMobile: false
            })
        } else if (this.state.filterViewMobile) {
            this.setState({
                filterViewMobile: false
            })
        } else {
            this.setState({
                listView: true
            }) 
        }
    }
    seeFilterViewMobile(bool) {
        this.setState({
            filterViewMobile: bool
        });
    }
    seeListViewMobile(bool) {
        this.setState(prevState =>({listViewMobile:!prevState.listViewMobile}))
    }
    getImgId(uid){
        let ftr = this.refs.filter.getFtr(uid);
        let imgcode =  ftr.getProperty('img_code');
        return imgcode;
    }
    toggleFullScreen() {
        var doc = window.document;
        var docEl = doc.documentElement;
      
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
      
        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
          requestFullScreen.call(docEl);
        }
        else {
          return
        }
      }
    

    render() {
        const listView = this.state.listView;
        const selected = this.state.selected;
        const visFtrs = this.state.visFtrs;
        const ftr = this.state.ftr;
        const mobileView = this.state.mobileView;
        const detailViewMobile = this.state.detailViewMobile;
        const filterViewMobile = this.state.filterViewMobile;
        const listViewMobile = this.state.listViewMobile;
        const splashVis = this.state.splashVis;
        const sortMethod = this.state.sortMethod;
        let view, mview, button, splash;

        if (splashVis) {
            splash = <Splash click={this.closeSplash} mobile={mobileView}/>
        }
        if (listView && !mobileView) {
            view = <div className="nav-wrap"><div className="filter-wrap">
                <p>Filter by year</p>
                <Years yrsFilter={this.yearsFilter} selected={this.state.years}/>
                <p>Filter by ward</p>
                <Wards wrdsFilter={this.wardsFilter} selected={this.state.wards}/>
                <p>Filter by program</p>
                <Programs prgrmFilter={this.programsFilter} selected={this.state.programs}/>
                <p>Ward layer</p>
                <WardToggle click={this.wardLayer} state={this.state.wardLayer} />
                
                
            </div>
            <div id="list-wrap">
                <p id="listSum">{visFtrs.length} Results</p>
                <p id="sortBy">Sort by</p>
                <SortDropdown setSortMethod={this.setSortMethod} state={this.state.sortMethod} />
                <FtrList ftrs={visFtrs} selectedChange={this.triggerTileClick} sortMethod={sortMethod}/>
            </div>
            </div>

        } else if (mobileView && listView && !listViewMobile){
            mview = <div>
            <div className="logo-wrap">
                <img aria-label="Logo" className="logo" src={logo}/>
                <h3 className="logo">StreetARToronto</h3>
            </div>
            <ToggleViewButton click={this.seeListViewMobile} state={listViewMobile}/>
            <div id="filter"><MobileFilterViewButton click={this.seeFilterViewMobile} filtered={this.state.filtered}/></div>
            </div>
        }
        else if (listViewMobile){
            mview =
            <div>
            <ToggleViewButton click={this.seeListViewMobile} state={listViewMobile}/>
            <div className="logo-wrap">
                <img aria-label="Logo" className="logo" src={logo}/>
                <h3 className="logo">StreetARToronto</h3>
            </div>
            <div id="filter"><MobileFilterViewButton click={this.seeFilterViewMobile} filtered={this.state.filtered}/></div>            
            
            <div id="list-wrap-mobile">
                <p id="listSum">{visFtrs.length} Results</p>
                <p id="sortBy">Sort by</p>
                <SortDropdown setSortMethod={this.setSortMethod} state={this.state.sortMethod} />
                <FtrList ftrs={visFtrs} selectedChange={this.triggerTileClick} sortMethod={sortMethod}/>
            </div>

            </div>
        } else if (mobileView){
                if (this.state.ftr.getProperty('img_code')){
                    let f = this.state.ftr.getProperty('img_code');
                    let img = process.env.REACT_APP_IMAGE_URL_PREFIX + f[0] + ".jpg";
                    
                
                
                mview = //forr pts
                <div>
                    <div className="logo-wrap">
                        <img aria-label="Logo" className="logo" src={logo}/>
                        <h3 className="logo">StreetARToronto</h3>
                    </div>
                    <ToggleViewButton click={this.seeListViewMobile} state={listViewMobile}/>
                    <div id="filter"><MobileFilterViewButton click={this.seeFilterViewMobile} filtered={this.state.filtered}/></div>
                    
                    <div id="MobileMapPopUp" onClick={this.seeDetail}>

                            <div className='popup-pic'><img aria-label="Thumbnail Preview" src={img} className="list-img" onError={(e)=>{e.target.onerror = null; e.target.src=placeholder}}/></div>
                            <div className="popup-txt">
                                <p>
                                <strong className='tileArtist'>
                                    {this.state.ftr.getProperty('artist')}
                                </strong>
                                </p>
                                <p className='tileAddress'>
                                    {this.state.ftr.getProperty('address')}
                                </p>
                                <p className='tileYear'>
                                    Created in {this.state.ftr.getProperty('yr')}
                                </p>
                            </div>

                    </div>
                </div>
                }
                else{ //for multipolygons (wards)
                mview = 
                <div>
                    <div className="logo-wrap">
                        <img aria-label="Logo" className="logo" src={logo}/>
                        <h3 className="logo">StreetARToronto</h3>
                    </div>
                    <ToggleViewButton click={this.seeListViewMobile} state={listViewMobile}/>
                    <div id="filter"><MobileFilterViewButton click={this.seeFilterViewMobile} filtered={this.state.filtered}/></div>
                    
                    <div id="MobileMapPopUp" onClick={this.seeDetail}>

                            <div className="popup-txt">
                            <h5 className='detailWard'>Ward {this.state.ftr.getProperty('AREA_L_CD')} <br/>
                                {this.state.ftr.getProperty('AREA_NAME')}
                            </h5>
                            </div>

                    </div>
                </div>
                }
                

        } else {
            view = <Detail uid={selected} ftr={ftr} vis={visFtrs} tileClick={this.triggerTileClick}/>;
            button = <div className="BackToListView" onClick={this.triggerBackToListViewButton}><BackToListViewButton ref="back"/></div>;
        }

        if (detailViewMobile) {
            mview =
            <div className="detailMob">
            <div className="logo-wrap-detail-mobile">
                <img aria-label="Logo" className="logo" src={logo}/>
                <h3 className="logo">StreetARToronto</h3>
            </div>
            <div className="BackToListView" onClick={this.triggerBackToListViewButton}><BackToListViewButton ref="back"/></div>
            <Detail uid={selected} ftr={ftr} click={this.triggerBackToListViewButton}/>
            </div>
        } else if (filterViewMobile) {
            mview =
            <div className="filter-wrap">
                <div className="BackToListView" onClick={this.triggerBackToListViewButton}>
                    <BackToListViewButton/>
                </div>

                <p>Filter by year</p>
                <Years yrsFilter={this.yearsFilter} selected={this.state.years}/>
                <p>Filter by ward</p>
                <Wards wrdsFilter={this.wardsFilter} selected={this.state.wards}/>
                <p>Filter by program</p>
                <Programs prgrmFilter={this.programsFilter} selected={this.state.programs}/>
                <p>Ward layer</p>
                <WardToggle click={this.wardLayer} state={this.state.wardLayer} />
                
            </div>
        }
        return (
            <div className="parent">
                {splash}
                <BetaBanner mobile={mobileView}/>
                <div id="theMap"><GMap selectedChange={this.triggerMapClick} ftr={ftr} ref="filter"/></div>
                <GeolocateButton click={this.triggerGeo}/>
                
                <div id="nav">
                        <div className="logo">
                            <img aria-label="Logo" className="logo" src={logo}/>
                            <h3 className="logo">StreetARToronto</h3>
                            {button}
                        </div>
                            {view}
                </div>
                {mview}
            </div>
        )
    }
}

ReactDOM.render( <App/> , document.getElementById("root"));

serviceWorker.unregister();
