import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

import Fly from "./Components/Fly";
import DataShow from "./Components/DataShow";
import geoJson from "./geojson.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoidmlubnUxMjMiLCJhIjoiY2xib25ybGQ3MDdvZTNuczVtNThkbGtoOSJ9.N4J6du4unwtxArPUvxwrpg";

const App = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(77.5913);
  const [lat, setLat] = useState(12.97912);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center:  [lng, lat],
      zoom: 10,    
    });


    map.on("load", () => {
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // Add a GeoJSON source with multiple points
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: geoJson.features,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
          
            }
          );
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
      });
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");


    // Clean up on unmount
    return () => map.remove();
  }, [lat, lng]);

  return (
    <div  className="main_container">
      <h1 className="heading" >Location Finder</h1>
      <div className="top_input_container" >
		    <Fly setLat={setLat} setLon={setLng} />
		    <div  className="coordinates_container">
			    <h3>Longitude : </h3><span>{lng}</span>
			    <h3>Latitude : </h3><span>{lat}</span>
		    </div>
	    </div>
      <div className="map-container" ref={mapContainerRef}/>
      <DataShow />
    </div>
  )
};

export default App;

