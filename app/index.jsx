import React from 'react';
import {render} from 'react-dom';

import GMap from './components/GMap.jsx';

class App extends React.Component {
  get initialCenter() {
    return { lng: -90.1056957, lat: 29.9717272 }
  }
  render () {
    return <div>
      <h1>React with Google Maps</h1>
      <GMap initialCenter={this.initialCenter} />
    </div>;
  }
}

render(<App/>, document.getElementById('ReactGMapsApp'));
