import React from 'react';
import {render} from 'react-dom';

import GMap from './components/GMap.jsx';

class App extends React.Component {
  get initialCenter() {
    return {
      lat: 0,
      lng: 0
    }
  }

  get initialMessage() {
    return "Searching for your location!"
  }

  render () {
    return <div>
      <h1>React with Google Maps</h1>
      <GMap center={this.initialCenter} message={this.initialMessage}/>
    </div>;
  }
}

render(<App/>, document.getElementById('ReactGMapsApp'));
