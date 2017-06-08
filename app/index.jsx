import React from 'react';
import {render} from 'react-dom';
import GMap from './components/GMap.jsx';

class App extends React.Component {
  get basicSettings() {
    return {
      initialCenter: {
        lat: 29.975588,
        lng: -90.102682
      },
      initialZoom: 12,
    }
  }

  get autocenterSettings() {
    let settings = this.basicSettings;
    settings.snapToUserLocation = true;
    return settings;
  }

  get brandedWithMarkerSettings() {
    let settings = this.basicSettings;
    settings.colors = {
      base: "#212121",
      baseContour1: "#4d4d4d",
      baseContour2: "#797979",
      baseContour3: "#a6a6a6",
      accent: "#fcbd40",
      accentLight: "#fcb24b"
    }
    settings.icons = {
      revelry: {
        name: "Revelry",
        image: './app/images/RevMarker.png',
      }
    }
    settings.markers = [
      {
        position: {
          lat: 29.975588,
          lng: -90.102682
        },
        icon: 'revelry',
        message: [
          "<h3>Revelry Labs</h3>",
          "<p>4200 Canal St, Suite E</p>",
          "<p>New Orleans, LA 70119</p>"].join(""),
      }
    ]
    return settings;
  }

  get multipleMarkersSettings() {
    let settings = this.basicSettings;
    settings.markers = [
      {
        position: {
          lat: 29.975588,
          lng: -90.102682
        }
      },
      {
        position: {
          lat: 29.988588,
          lng: -90.112682
        }
      },
      {
        position: {
          lat: 29.955588,
          lng: -90.092682
        }
      }
    ]
    return settings;
  }

  get mapWithLegendSettings() {
    let settings = this.basicSettings;
    settings.initialZoom = 14;
    settings.icons = {
      sunglasses: {
        name: "Sunglasses",
        image: "./app/images/one.png"
      },
      burger: {
        name: "Burger",
        image: "./app/images/two.png"
      },
      smile: {
        name: "Smile",
        image: "./app/images/three.png"
      }
    }
    settings.markers = [
      {
        position: {
          lat: 29.975588,
          lng: -90.102682
        },
        icon: 'sunglasses'
      },
      {
        position: {
          lat: 29.975588,
          lng: -90.106999
        },
        icon: 'burger'
      },
      {
        position: {
          lat: 29.977999,
          lng: -90.106999
        },
        icon: 'smile'
      }
    ]
    settings.legend = true;
    return settings;
  }

  render () {
    return (
      <div>
        <h1>React with Google Maps</h1>
        <div className="mapContainer">
          <h4>Basic Map</h4>
          <GMap config={this.basicSettings} />
        </div>
        <div className="mapContainer">
          <h4>Basic Map Autocentered to User's Location</h4>
          <GMap config={this.autocenterSettings} />
        </div>
        <div className="mapContainer">
          <h4>Branded Map with Single Custom Marker</h4>
          <GMap config={this.brandedWithMarkerSettings} />
        </div>
        <div className="mapContainer">
          <h4>Multiple Markers</h4>
          <GMap config={this.multipleMarkersSettings} />
        </div>
        <div className="mapContainer">
          <h4>Map with Legend</h4>
          <GMap config={this.mapWithLegendSettings} />
        </div>
      </div>
    )
  }
}

render(<App/>, document.getElementById('ReactGMapsApp'));
