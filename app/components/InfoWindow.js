import React from 'react';

export default function InfoWindow(map, anchor, content) {
  return new google.maps.InfoWindow({
    map: map,
    anchor: anchor,
    content: `<div class='InfoWindow'>${content}</div>`
  })
}
