import React from 'react';
import chai, {expect} from 'chai';
import {mount, shallow, render} from 'enzyme';
import Gmap from '../app/components/Gmap';

var settings = {};

describe('Gmap', () => {
  it('should render without any config', () => {
    const map = mount(<Gmap />);
  });

  it('should render with snap-to-user-location enabled', () => {
    settings.snapToUserLocation = true;
    mount(<Gmap config={settings} />)
  });

  it('should render with a given initial center and zoom', () => {
    settings.initialCenter = { lat: 29.975588, lng: -90.102682 };
    settings.initialZoom = 11;
    mount(<Gmap config={settings} />)
  });

  it('should render with custom colors', () => {
    settings.colors = {
      base: "#212121",
      baseContour1: "#4d4d4d",
      baseContour2: "#797979",
      baseContour3: "#a6a6a6",
      accent: "#fcbd40",
      accentLight: "#fcb24b"
    }
    mount(<Gmap config={settings} />)
  });

  it('should render a marker without a custom icon', () => {
    settings.markers = [
      {position: {
          lat: 29.975588,
          lng: -90.102682
        },
        message: "test message"
      }]
      mount(<Gmap config={settings} />)
  });

  it('should render multiple markers with custom icons', () => {
    settings.icons = {
        revelry: {
        name: "Revelry",
        image:'./app/RevMarker.png'
      }
    };
    settings.markers.push({
      position: {
        lat: 29.995594,
        lng: -90.102682
      },
      icon: 'revelry',
      message: "A second marker",
    })
    mount(<Gmap config={settings} />)
  })

})
