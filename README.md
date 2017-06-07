# React with Google Maps

### A Repo to provide a working example to go with the Blog Post
###### http://revelry.co/google-maps-react-component-in-es6


#### Run Locally

1. `npm install` to install dependencies.
2. You'll need a Google Maps API key - get one [here](https://developers.google.com/maps/documentation/javascript/get-api-key) and set up your `.env` file, using `.env.example` as a guide.
2. `npm run dev` to start the development server.
3. Open up `localhost:8080` in your browser and you should see the map!
4. Make some changes - various configuration options can be found in `index.jsx`. Hit save, and the page will reload with your new code.

#### Using the Component in a Project

##### Setup

1. Copy `app/components/GMap.jsx` and `app/components/MapStyles.js` into your project.
2. `npm install react-load-script` will install the npm package needed to load Google Maps within the component.
3. Replace `process.env.GOOGLE_API_KEY` in the `render` method with your API key (either by setting it as a Node environment variable or by copying and pasting if you live on the edge).

##### Usage

`<Gmap />` with no props renders a regular map with no styling or markers, centered at latitude 29.975588 and longitude -90.102682.

To customize the map, pass it a `config` object as a prop. Example usage:

```

let settings = {
  initialCenter: {
    lat: 29.975588,
    lng: -90.102682
  },
  initialZoom: 11,
  icons: {
    revelry: './app/RevMarker.png',
  },
  markers: [
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
    },
  ],
  colors: {
    base: "#212121",
    baseContour1: "#4d4d4d",
    baseContour2: "#797979",
    baseContour3: "#a6a6a6",
    accent: "#fcbd40",
    accentLight: "#fcb24b"
  },
  snapToUserLocation: false,
}

<GMap config={settings} />
```

All properties in the config object are optional, so if you don't want, say, custom colors, just remove the `colors` from the config object and it will render with the default Google Maps colors.
