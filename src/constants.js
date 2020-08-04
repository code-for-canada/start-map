import markerBlue from './assets/img/marker-blue.svg';
import markerRed from './assets/img/marker-red.svg';
import markerGreen from './assets/img/marker-green.svg';
import markerYellow from './assets/img/marker-yellow.svg';

export const ICONS_REG = {
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
  },
};


export const YEAR_OPTS = [
  {
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
  },
  {
    value: '2019',
    label: '2019'
  },
];

export const WARD_OPTS = [
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

export const PROGRAM_OPTS = [
  {
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
  }
];

export const SORT_OPTS = [
  {
    value: "artist-asc",
    label: "Artist: A-Z"
  },
  {
    value: "artist-desc",
    label: "Artist: Z-A"
  },
  {
    value: "year-asc",
    label: "Year: Low to High "
  },
  {
    value: "year-desc",
    label: "Year: High to Low"
  }
];

export const DEFAULT_MAP_CENTER = {
  lat: 43.6790637,
  lng: -79.4324065
};

export const MAP_ZOOM_LEVEL = {
  DEFAULT: 12,
  FEATURE: 18,
  MIN: 10,
}

export const MAP_STYLE_WARD_DEFAULT = {
  visible: false,
  fillColor: 'DarkGray',
  strokeColor: 'Gray',
  strokeWeight: 2,
}

export const MAP_STYLE_WARD_ACTIVE = {
  // Ensure active ward always has border lines on top.
  zIndex: 1000,
  fillColor: 'LightBlue',
  strokeColor: 'MidnightBlue',
  strokeWeight: 3,
}

// This can be editted quite easily for a new look.
// See: https://mapstyle.withgoogle.com/
export const MAP_STYLE_BASE = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
