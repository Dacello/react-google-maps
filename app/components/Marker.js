export default function Marker(position, map) {
  let image = './app/RevMarker.png'

  return new google.maps.Marker({
    position: position,
    map: map,
    // set this to false to create a static marker
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: image
  })
}
