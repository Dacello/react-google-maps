import React from 'react';
import MapStyles from './MapStyles';
import Script from 'react-load-script';
import PropTypes from 'prop-types';

export default class GMap extends React.Component {
  static get propTypes() {
    return {
      config: PropTypes.shape({
        colors: PropTypes.objectOf(PropTypes.string),
        initialCenter: PropTypes.objectOf(PropTypes.number),
        initialMessage: PropTypes.string,
        markerImage: PropTypes.string,
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
      zoom: 11,
      infoWindowIsOpen: true
    };
  }

  loadMap() {
    if (this.state.scriptLoaded) {
      // lets map autocenter on user's location (if the user enables it)
      // which takes a while, so the map is created and goes to the initial center first
      if (this.props.config.snapToUserLocation && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
          this.setState({
            center: this.mapCenter(position.coords.latitude, position.coords.longitude)
          });
          this.moveMap("Got it!");
        }, () => this.infoWindow.setContent("Couldn't find your location :("))
      } else {
        this.setState({
          center: this.mapCenter(this.props.config.initialCenter.lat, this.props.config.initialCenter.lng)
        })
      }
      // create the map, marker and infoWindow after the component has
      // been rendered because we need to manipulate the DOM for Google =(
      this.map = this.createMap(this.props.config.initialCenter);
      this.marker = this.newMarker(this.props.config.initialCenter, this.map, this.props.config.markerImage);
      this.infoWindow = this.newInfoWindow(this.map, this.marker, this.props.config.initialMessage);

      // have to define google maps event listeners here too
      // because we can't add listeners on the map until its created
      google.maps.event.addListener(this.map, 'zoom_changed', () => this.handleZoomChange());
      google.maps.event.addListener(this.marker, 'click', () => this.toggleInfoWindow())
    }
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap(center) {
    let mapOptions = {
      zoom: this.state.zoom,
      center: center,
      mapTypeId: 'terrain'
    }
    if (this.props.config.colors) {
      mapOptions.styles = MapStyles(this.props.config.colors)
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
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

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }

  newInfoWindow(map, anchor, content) {
    return new google.maps.InfoWindow({
      map: map,
      anchor: anchor,
      content: content
    })
  }

  newMarker(position, map, image) {
    return new google.maps.Marker({
      position: position,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: image
    })
  }

  toggleInfoWindow() {
    if (this.state.infoWindowIsOpen) {
      this.infoWindow.close()
      this.setState({
        infoWindowIsOpen: false
      })
    } else {
      this.infoWindow = this.newInfoWindow(this.map, this.marker, this.props.config.initialMessage);
      this.setState({
        infoWindowIsOpen: true
      })
    }
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
      <div className='UpdatedText' id="zoom">
        <p>Current Zoom: { this.state.zoom }</p>
      </div>
      <div className='GMap-canvas' ref="mapCanvas">
      </div>
    </div>
  }
}
