import React from 'react';

export default class GMap extends React.Component {
  // static propTypes() {
  //   initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
  // }

  constructor(props){
    super(props);
    this.state = {
      zoom: 10,
      center: this.mapCenter(props.center.lat, props.center.lng)
    };
  }

  render() {
    return <div className="GMap">
      <div className='UpdatedText'>
        <p>Current Zoom: { this.state.zoom }</p>
      </div>
      <div className='GMap-canvas' ref="mapCanvas">
      </div>
    </div>
  }

  componentDidMount() {

    // lets map autocenter on user's location (if the user enables it)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        this.setState({
          center: this.mapCenter(position.coords.latitude, position.coords.longitude)
        })
        this.map.panTo(this.state.center);
        this.marker.setPosition(this.state.center);
        this.infoWindow.setContent("Got it!")
      })
    }
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap(this.state.center);
    this.marker = this.createMarker(this.state.center);
    this.infoWindow = this.createInfoWindow(this.props.message);

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
      center: center
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter(lat, lng) {
    return new google.maps.LatLng(lat,lng)
  }

  createMarker(location) {
    return new google.maps.Marker({
      position: location,
      map: this.map,
      // set this to false to create a static marker
      draggable:true
    })
	}

  createInfoWindow(message) {
    return new google.maps.InfoWindow({
      map: this.map,
      anchor: this.marker,
      content: `<div class='InfoWindow'>${message}</div>`
    })
  }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }
}
