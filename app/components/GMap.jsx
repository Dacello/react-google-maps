import React from 'react';
import MapStyles from './MapStyles';
import Script from 'react-load-script';
import PropTypes from 'prop-types';

export default class GMap extends React.Component {
  static get propTypes() {
    return {
      config: PropTypes.shape({
        colors: PropTypes.objectOf(PropTypes.string),
        icons: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
        initialCenter: PropTypes.objectOf(PropTypes.number),
        initialZoom: PropTypes.number,
        legend: PropTypes.bool,
        markers: PropTypes.arrayOf(PropTypes.shape({
          position: PropTypes.objectOf(PropTypes.number),
          icon: PropTypes.string,
          message: PropTypes.string
        })),
        snapToUserLocation: PropTypes.bool
      })
    }
  }

  static get defaultProps() {
    return {
      config: {
        initialCenter: {
          lat: 29.975588,
          lng: -90.102682
        },
        initialZoom: 10
      }
    }
  }

  constructor(props){
    super(props);
    this.state = {
      center: null
    };
  }

  loadMap() {
    const {config} = this.props;
    if (this.state.scriptLoaded) {
      if (config && config.snapToUserLocation && navigator.geolocation) {
        this.getUserLocation()
      } else {
        this.setState({
          center: this.mapCenter(config.initialCenter.lat, config.initialCenter.lng)
        })
      }
      // create the map and markers after the component has
      // been rendered because we need to manipulate the DOM for Google =(
      this.map = this.createMap(config.initialCenter);
      if (config && config.markers) {
        this.markers = this.createMarkers(config.markers);
        if (config.legend) {
          this.createLegend(config.icons);
        }
      }
    }
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'click')
  }

  createLegend(icons) {
    const {legend} = this.refs;
    for (const key in icons) {
      const type = icons[key], name = type.name, icon = type.image;
      const div = document.createElement('div');
      div.innerHTML = `<img src="${icon}"> ${name}`;
      legend.appendChild(div);
    }
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
  }

  createMap(center) {
    const {config} = this.props;
    const mapOptions = {
      zoom: this.props.config.initialZoom,
      center: center,
    }
    if (config && config.colors) {
      mapOptions.styles = MapStyles(config.colors)
      mapOptions.mapTypeId = 'terrain'
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  createMarkers(markers) {

    markers.forEach( (marker) => {
      const {config} = this.props,
      icon = config.icons && config.icons[marker.icon].image,
      thisMarker = this.newMarker(marker.position, icon);
      
      // have to define google maps event listeners here too
      // because we can't add listeners on the map until it's created
      if (marker.message){
        google.maps.event.addListener(thisMarker, 'click', () => this.newInfoWindow(thisMarker, marker.message));
      }
    })
  }

  getUserLocation() {
    // lets map autocenter on user's location (if the user enables it)
    // which takes a while, so the map should get rendered with the initial center first
      navigator.geolocation.getCurrentPosition( (position) => {
        this.moveMap(position.coords.latitude, position.coords.longitude, "You are here.");
      }, () => alert("Couldn't find your location"))
  }

  handleScriptCreate() {
    this.setState({
      scriptLoaded: false
    })
  }

  handleScriptError() {
    this.setState({
      scriptError: true
    })
  }

  handleScriptLoad() {
    this.setState({
      scriptLoaded: true
    });
    this.loadMap();
  }

  newInfoWindow(anchor, content) {
    return new google.maps.InfoWindow({
      map: this.map,
      anchor: anchor,
      content: content
    })
  }

  newMarker(position, image) {
    return new google.maps.Marker({
      position: position,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: image
    })
  }

  mapCenter(lat, lng) {
    return new google.maps.LatLng(lat,lng)
  }

  moveMap(lat, lng, message) {
    this.setState({
      center: this.mapCenter(lat, lng)
    });
    this.map.panTo(this.state.center);
    let thisMarker = this.newMarker(this.state.center);
    this.newInfoWindow(thisMarker, message);
  }

  render() {
    let url = "http://maps.googleapis.com/maps/api/js?key=" + process.env.GOOGLE_API_KEY
    return (
      <div className="GMap">
        <Script
          url={url}
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className='GMap-canvas' ref="mapCanvas"></div>
        {this.props.config.legend && <div ref="legend" className="legend"><h3>Legend</h3></div>}
      </div>
    )
  }
}
