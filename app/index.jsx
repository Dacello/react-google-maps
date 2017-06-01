import React from 'react';
import {render} from 'react-dom';

import GMap from './components/GMap.jsx';

class App extends React.Component {

  render () {
    return <div>
      <h1>React with Google Maps</h1>
      <GMap />
    </div>;
  }
}

render(<App/>, document.getElementById('ReactGMapsApp'));
