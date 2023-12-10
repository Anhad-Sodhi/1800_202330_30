// Function to initialize Mapbox
function initMapbox() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZGFuZDUiLCJhIjoiY2xvZnkyZHcxMHA4bjJsbzl2bXl2cXNpeSJ9.NkYxQSRO1UmyP1G_xk5D1g";
}

// Function to create a Mapbox map
function createMap(container, style, center, zoom) {
  return new mapboxgl.Map({
    container: container,
    style: style,
    center: center,
    zoom: zoom,
  });
}

// Function to add user's location to the map
function addUserLocation(map, userLocation) {
  // Add user's location pin icon
  map.loadImage(
    "https://cdn-icons-png.flaticon.com/512/9805/9805148.png",
    (error, image) => {
      if (error) throw error;

      map.addImage("userpin", image, { width: 10, height: 10 });

      // Add user's location as a source to the map
      map.addSource("userLocation", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: userLocation,
              },
              properties: {
                description: "Your location",
              },
            },
          ],
        },
      });

      // Create a layer above the map displaying the user's location
      map.addLayer({
        id: "userLocation",
        type: "symbol",
        source: "userLocation",
        layout: {
          "icon-image": "userpin",
          "icon-size": 0.05,
          "icon-allow-overlap": true,
        },
      });

      // Map On Click function that creates a popup displaying the user's location
      map.on("click", "userLocation", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the userLocation layer.
      map.on("mouseenter", "userLocation", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Defaults cursor when not hovering over the userLocation layer
      map.on("mouseleave", "userLocation", () => {
        map.getCanvas().style.cursor = "";
      });
    }
  );
}

// Function to add event pins to the map
function addEventPins(map, features, anchor) {
  // Add event pin icon
  map.loadImage(
    "https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png",
    (error, image) => {
      if (error) throw error;

      map.addImage("eventpin", image);

      // Add features as a source to the map
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: features,
        },
      });

      // Create a layer above the map displaying the event pins
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": "eventpin",
          "icon-size": 0.1,
          "icon-allow-overlap": true,
        },
      });

      // Map On Click function that creates a popup displaying information from Firestore
      map.on("click", "places", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;
        const id = e.features[0].properties.id;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "places", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Defaults cursor when not hovering over the places layer
      map.on("mouseleave", "places", () => {
        map.getCanvas().style.cursor = "";
      });

      // Add event listener to the map link
      anchor.addEventListener("click", () => {
        // Your logic for handling the map link click
        // For example, open a new window or navigate to a different page
        window.open(anchor.href, "_blank");
      });
    }
  );
}

// Function to fetch event data from Firestore
function fetchEventData(callback) {
  db.collection("listings")
    .where("email", "!=", firebase.auth().currentUser.email)
    .get()
    .then(callback);
}

// Function to create event features from Firestore data
function createEventFeatures(allEvents) {
  const features = [];

  allEvents.forEach((doc) => {
    const lat = doc.data().lat;
    const lng = doc.data().lng;
    const coordinates = [lng, lat];

    const event_name = doc.data().foodName;
    const preview = doc.data().foodDescription;
    const idd = doc.id;
    const listPrice = doc.data().foodPrice;

    features.push({
      type: "Feature",
      properties: {
        id: doc.id,
        description: `<strong>${event_name}</strong><p>${preview}</p> <p>$${listPrice}</p><a id="mapAnchor" href="/pages/listing.html?var1=${idd}" target="_blank" title="Opens in a new window">Read more</a>`,
      },
      geometry: {
        type: "Point",
        coordinates: coordinates,
      },
    });
  });

  return features;
}

// Function to show the map with the user's location and event pins
function showMap() {
  navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = [position.coords.longitude, position.coords.latitude];
    initMapbox();
    const map = createMap(
      "map",
      "mapbox://styles/dand5/clofy6cum004j01qg3xph52ua",
      userLocation,
      14
    );

    map.on("load", () => {
      fetchEventData((allEvents) => {
        const features = createEventFeatures(allEvents);
        const mapLink = document.getElementById("mapAnchor");
        addEventPins(map, features, mapLink);
      });
    });

    addUserLocation(map, userLocation);
  });
}

// Function to show the map for a listing page
function showListingMap() {
  navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = [position.coords.longitude, position.coords.latitude];
    initMapbox();
    const map = createMap(
      "map",
      "mapbox://styles/dand5/clofy6cum004j01qg3xph52ua",
      userLocation,
      17
    );

    map.on("load", () => {
      fetchEventData((allEvents) => {
        const features = createEventFeatures(allEvents);
        addEventPins(map, features, null); // Null for map link on listing page
      });
    });

    addUserLocation(map, userLocation);
  });
}

// Call the function to display the map with the user's location and event pins
showMap();
