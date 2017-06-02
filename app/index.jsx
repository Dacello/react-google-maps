import React from 'react';
import {render} from 'react-dom';

import GMap from './components/GMap.jsx';

class App extends React.Component {
  get initialCenter() {
    return {
      lat: 29.975588,
      lng: -90.102682
    }
  }

  get initialMessage() {
    return "Revelry Labs!"
  }

  render () {
    return <div>
      <h1>React with Google Maps</h1>
      <GMap center={this.initialCenter} message={this.initialMessage} findUserLocation={false}/>
    </div>;
  }
}

render(<App/>, document.getElementById('ReactGMapsApp'));
