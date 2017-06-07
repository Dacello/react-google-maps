import React from 'react';
import MapStyles from './MapStyles';
import Script from 'react-load-script';
import PropTypes from 'prop-types';

export default class GMap extends React.Component {
  static get propTypes() {
    return {
      config: PropTypes.shape({
        colors: PropTypes.objectOf(PropTypes.string),
        icons: PropTypes.objectOf(PropTypes.string),
        initialCenter: PropTypes.objectOf(PropTypes.number),
        initialZoom: PropTypes.number,
        markers: PropTypes.arrayOf(PropTypes.object),
        snapToUserLocation: PropTypes.bool
      })
    }
  }

  static get defaultProps() {
    return {
        center: {
          lat: 29.975588,
          lng: -90.102682 },
        message: "Default Message"
    }
  }

  constructor(props){
    super(props);
    this.state = {
      // infoWindowIsOpen: true
    };
  }

  loadMap() {
    if (this.state.scriptLoaded) {
      if (this.props.config.snapToUserLocation && navigator.geolocation) {
        this.getUserLocation()
      } else {
        this.setState({
          center: this.mapCenter(this.props.config.initialCenter.lat, this.props.config.initialCenter.lng)
        })
      }
      // create the map and markers after the component has
      // been rendered because we need to manipulate the DOM for Google =(
      this.map = this.createMap(this.props.config.initialCenter);
      this.markers = this.createMarkers(this.props.config.markers)
    }
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap(center) {
    let mapOptions = {
      zoom: this.props.config.initialZoom,
      center: center,
      mapTypeId: 'terrain'
    }
    if (this.props.config.colors) {
      mapOptions.styles = MapStyles(this.props.config.colors)
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  createMarkers(markers) {
    markers.forEach( (marker) => {
      let thisMarker = this.newMarker(marker.position, this.props.config.icons[marker.icon]);
      // have to define google maps event listeners here too
      // because we can't add listeners on the map until it's created
      google.maps.event.addListener(thisMarker, 'click', () => this.newInfoWindow(thisMarker, marker.message));
    })
  }

  getUserLocation() {
    // lets map autocenter on user's location (if the user enables it)
    // which takes a while, so the map should get rendered with the initial center first
      navigator.geolocation.getCurrentPosition( (position) => {
        this.setState({
          center: this.mapCenter(position.coords.latitude, position.coords.longitude)
        });
        this.moveMap("Found your location!");
      }, () => this.infoWindow.setContent("Couldn't find your location :("))
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

  moveMap(message) {
    this.map.panTo(this.state.center);
    this.marker.setPosition(this.state.center);
    this.infoWindow.setContent(message)
  }

  render() {
    let url = "http://maps.googleapis.com/maps/api/js?key=" + process.env.GOOGLE_API_KEY
    return <div className="GMap">
      <Script
        url={url}
        onCreate={this.handleScriptCreate.bind(this)}
        onError={this.handleScriptError.bind(this)}
        onLoad={this.handleScriptLoad.bind(this)}
      />
      <div className='GMap-canvas' ref="mapCanvas">
      </div>
    </div>
  }
}
