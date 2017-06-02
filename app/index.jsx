import React from 'react';
import {render} from 'react-dom';

import GMap from './components/GMap.jsx';

class App extends React.Component {
  get mapSettings() {
    return {
      // if you prefer the regular Google Maps colors,
      // remove this option completely
      colors: {
        base: "#212121",
        baseContour1: "#4d4d4d",
        baseContour2: "#797979",
        baseContour3: "#a6a6a6",
        accent: "#fcbd40",
        accentLight: "#fcb24b"
      },
      initialCenter: {
        lat: 29.975588,
        lng: -90.102682
      },
      initialMessage: [
        "<div class='InfoWindow'>",
        "<h3>Revelry Labs</h3>",
        "<p>4200 Canal St, Suite E</p>",
        "<p>New Orleans, LA 70119</p>",
        "</div>"].join(""),
      // set a custom image to use as a pointer
      markerImage: './app/RevMarker.png',
      snapToUserLocation: false,
    }
  }

  render () {
    return <div>
      <h1>React with Google Maps</h1>
      <GMap
        center={this.mapSettings.initialCenter}
        colors={this.mapSettings.colors}
        findUserLocation={this.mapSettings.snapToUserLocation}
        markerImage={this.mapSettings.markerImage}
        message={this.mapSettings.initialMessage} />
    </div>;
  }
}

render(<App/>, document.getElementById('ReactGMapsApp'));
