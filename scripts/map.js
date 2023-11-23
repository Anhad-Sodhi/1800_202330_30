
const mapLink = document.getElementById("mapAnchor");



//All code in here is from techtips M1

function showMap() {
  navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = [position.coords.longitude, position.coords.latitude];
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGFuZDUiLCJhIjoiY2xvZnkyZHcxMHA4bjJsbzl2bXl2cXNpeSJ9.NkYxQSRO1UmyP1G_xk5D1g";
    const map = new mapboxgl.Map({
      container: "map", // Container ID
      style: "mapbox://styles/dand5/clofy6cum004j01qg3xph52ua", // Styling URL
      center: [position.coords.longitude, position.coords.latitude], // Starting position
      zoom: 17, // Starting zoom
    });
    // Adds map features
    // map.addControl(new mapboxgl.NavigationControl());

    map.on("load", () => {
      // Defines map pin icon for events
      map.loadImage(
        "https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png",
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage("eventpin", image); // Pin Icon

          // READING information from "events" collection in Firestore
          db.collection("listings")
            .where("email", "!=", firebase.auth().currentUser.email).get()
            .then((allEvents) => {
              const features = []; // Defines an empty array for information to be added to

              allEvents.forEach((doc) => {
                lat = doc.data().lat;
                lng = doc.data().lng;
                coordinates = [lng, lat];
                // Coordinates
                event_name = doc.data().foodName; // Event Name
                preview = doc.data().foodDescription; // Text Preview
                idd = doc.id

                // Pushes information into the features array
                features.push({
                  type: "Feature",
                  properties: {
                    id: doc.id,
                    description: `<strong>${event_name}</strong><p>${preview}</p> <br> <a id="mapAnchor" href="/listing.html?var1=${idd} " target="_blank" title="Opens in a new window">Read more</a>`,
                  },
                  geometry: {
                    type: "Point",
                    coordinates: coordinates,
                  },
                });
              });

              // Adds features as a source to the map
              map.addSource("places", {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: features,
                },
              });

              // Creates a layer above the map displaying the pins
              map.addLayer({
                id: "places",
                type: "symbol",
                // source: 'places',
                source: "places",
                layout: {
                  "icon-image": "eventpin", // Pin Icon
                  "icon-size": 0.1, // Pin Size
                  "icon-allow-overlap": true, // Allows icons to overlap
                },
              });

              // Map On Click function that creates a popup, displaying previously defined information from "events" collection in Firestore
              map.on("click", "places", (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;
                const id = e.features[0].properties.id;

                // window.location.href = './listing.html?var1=' + id;

                // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
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
            });
        }
      );
    });

    // Add the image to the map style.
    map.loadImage(
      "https://cdn-icons-png.flaticon.com/512/9805/9805148.png",
      (error, image) => {
        if (error) throw error;

        // Add the image to the map style with width and height values
        map.addImage("userpin", image, { width: 10, height: 10 });

        // Adds user's current location as a source to the map
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          console.log(userLocation);
          if (userLocation) {
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

            // Creates a layer above the map displaying the user's location
            map.addLayer({
              id: "userLocation",
              type: "symbol",
              source: "userLocation",
              layout: {
                "icon-image": "userpin", // Pin Icon
                "icon-size": 0.05, // Pin Size
                "icon-allow-overlap": true, // Allows icons to overlap
              },
            });

            // Map On Click function that creates a popup displaying the user's location
            map.on("click", "userLocation", (e) => {
              // Copy coordinates array.
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

            // Defaults
            // Defaults cursor when not hovering over the userLocation layer
            map.on("mouseleave", "userLocation", () => {
              map.getCanvas().style.cursor = "";
            });
          }
        });
      }
    );
  });
}


// Call the function to display the map with the user's location and event pins
showMap();
