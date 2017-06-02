export default function Marker(position, map) {

  return new google.maps.Marker({
    position: position,
    map: map,
    // set this to false to create a static marker
    draggable: true
  })
}
