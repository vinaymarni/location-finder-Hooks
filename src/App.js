import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import ReactDOM from 'react-dom/client';
import "./App.css";

import { Tooltip } from './Components/Tooltip';
import Fly from "./Components/Fly";
import DataShow from "./Components/DataShow";
import geoJson from "./geojson.json";

mapboxgl.accessToken = "pk.eyJ1IjoidmlubnUxMjMiLCJhIjoiY2xib25ybGQ3MDdvZTNuczVtNThkbGtoOSJ9.N4J6du4unwtxArPUvxwrpg";

const App = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const [lng, setLng] = useState(77.5913);
  const [lat, setLat] = useState(12.97912);
  const [lati, setLati] = useState(0)
  const [lang, setLang] = useState(0)

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center:  [lng, lat],
      zoom: 10,    
    });

    //upload image as a marker
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

    //Adding popup (Tooltip) featire////////////////////////////////
    map.on('mouseenter', e => {
      if (e.features.length) {
        map.getCanvas().style.cursor = 'pointer';
      }
    });

    map.on('mouseleave', () => {
      map.getCanvas().style.cursor = '';
    });

    map.on('mousemove', e => {
      // Create tooltip node
      const tooltipNode = document.createElement('div');
      //ReactDOM.render(<Tooltip />, tooltipNode);
  
      const root = ReactDOM.createRoot(tooltipNode);
      root.render(
        <Tooltip />
      );
  
      // Set tooltip on map
      tooltipRef.current
        .setLngLat(e.lngLat)
        .setDOMContent(tooltipNode)
        .addTo(map);
    
    });

    //Get location details from map by selecting//
    map.on('click', e => {
        setLati(e.lngLat.wrap().lat)
        setLang(e.lngLat.wrap().lng)
    });

    // Clean up on unmount
    return () => map.remove();
  }, [lat, lng, lati, lang]);

  return (
    <div  className="main_container">
      <h1 className="heading" >Location Finder</h1>
      <div className="top_input_container" >
		    <Fly setLat={setLat} setLon={setLng} setAreaLat={lati} setAreaLon={lang} />
		    <div  className="coordinates_container">
			    <h3>Longitude : </h3><span>{lng}</span>
			    <h3>Latitude : </h3><span>{lat}</span>
		    </div>
	    </div>
      <div className = "dispaly-coordinaters">
        <h2 style={{color: "black", fontSize: "20px", fontWeight: "bold"}}>Lati : </h2><span style={{color: "blue"}}>{lati}</span>
        <h2 style={{color: "black", fontSize: "20px", fontWeight: "bold"}}>Long : </h2><span style={{color: "blue"}}>{lang}</span>    
      </div>
      <div className="map-container" ref={mapContainerRef}/>
      <DataShow />
    </div>
  )
};

export default App;
