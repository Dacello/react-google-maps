import React from 'react';
import {render} from 'react-dom';

import GMap from './components/GMap.jsx';

class App extends React.Component {
  get mapSettings() {
    return {
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
      initialMessage: "Revelry Labs!",
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
