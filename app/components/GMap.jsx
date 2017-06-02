import React from 'react';
import MapStyles from './MapStyles';
import Marker from './Marker';
import InfoWindow from './InfoWindow';

export default class GMap extends React.Component {
  static propTypes() {
    center: React.PropTypes.objectOf(React.PropTypes.number).isRequired;
    message: React.PropTypes.string.isRequired;
    findUserLocation: React.PropTypes.string;
  }

  constructor(props){
    super(props);
    this.state = {
      zoom: 12,
      center: this.mapCenter(props.center.lat, props.center.lng)
    };
  }

  componentDidMount() {

    // lets map autocenter on user's location (if the user enables it)
    if (this.props.findUserLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        this.setState({
          center: this.mapCenter(position.coords.latitude, position.coords.longitude)
        });
        this.moveMap("Got it!");
      }, () => this.infoWindow.setContent("Couldn't find your location :("))
    }
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap(this.state.center);
    this.marker = Marker(this.state.center, this.map);
    this.infoWindow = InfoWindow(this.map, this.marker, this.props.message);

    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange());
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap(center) {
    let mapOptions = {
      zoom: this.state.zoom,
      center: center,
      styles: MapStyles()
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
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
    return <div className="GMap">
      <div className='UpdatedText' id="zoom">
        <p>Current Zoom: { this.state.zoom }</p>
      </div>
      <div className='GMap-canvas' ref="mapCanvas">
      </div>
    </div>
  }
}
