import React, { useState } from "react";
import Axios from "axios";
import "./fly.css";
import {getMapDetails} from "./Tooltip";

const API_KEY = "pk.eyJ1IjoidmlubnUxMjMiLCJhIjoiY2xib25ybGQ3MDdvZTNuczVtNThkbGtoOSJ9.N4J6du4unwtxArPUvxwrpg";

const getData = async (lat, lon, place) => {
	let fetchingData = []
	const file = {
		id : fetchingData.length + 1,
		place : place,
		lat : lat,
		lon : lon
	}
	let {data, status} = await Axios.get(`http://localhost:3000/`)
	if(status === 200) {	
		fetchingData = data
		//console.log(data)
	}
	file.id = fetchingData.length + 1
	fetchingData.push(file)
    await Axios.post(`http://localhost:3000/`, file)
	.then((res) => { 
		//console.log("Posting Data", res)
	})
	.catch(err => console.log(err))
}

//Get location details from map by selecting //

const getSelectedDataFromMap = async (areaAddress, localityId, localArea, latitude, longitude) => {
	let newArray = []
	const dataFromMap = {
		id : newArray.length + 1,
		areaAddress : areaAddress,
		localityId :localityId,
		localArea : localArea,
		latitude : latitude,
		longitude : longitude
	};

	let {data, status} = await Axios.get(`http://localhost:3000/getAddress/`)
	if(status === 200) {	
		newArray = data
		//console.log(data)
	}
	dataFromMap.id = newArray.length + 1
	newArray.push(dataFromMap)
    await Axios.post(`http://localhost:3000/postByClick/`, dataFromMap)
	.then((res) => { 
		//console.log("Posting Data", res)
	})
	.catch(err => console.log(err))
};



const Fly = ({ setLat, setLon, setAreaLat, setAreaLon }) => {
	const [city, setCity] = useState("bengaluru");

	//Get location details from map by selecting//
	Axios.get(
		`http://api.tiles.mapbox.com/v4/geocode/mapbox.places/${setAreaLon},${setAreaLat}.json?access_token=${API_KEY}`
	).then((res) => {		
		
		//console.log(res)
		let areaAddress = res.data.features[0].place_name
		let localityId = res.data.features[0].id
		let localArea = res.data.features[0].text
		let latitude = setAreaLat
		let longitude = setAreaLon
		getMapDetails(localityId, localArea);
		getSelectedDataFromMap(areaAddress, localityId, localArea, latitude, longitude)
		
	});

	function getCoordinates() {
		Axios.get(
		`https://api.mapbox.com/geocoding/v5/
			mapbox.places/${city}.json?access_token=${API_KEY}`
		).then((res) => {
			let lon = res.data.features[0].geometry.coordinates[0]
			let lat = res.data.features[0].geometry.coordinates[1]
			let place = res.data.features[0].place_name			
			setLon(lon);		
			setLat(lat);
			//console.log(lat, lon, place)
			getData(lat, lon, place)
		});	
	}

	return (
		<div className="fly">
			<h2>Enter a city name</h2>
			<div className="inp-box">
				<input
				type="search"
				placeholder="Enter City or Area"
				onChange={(e) => {
					setCity(e.target.value);
				}}
				/>
				<button id="button"onClick={() => getCoordinates()}>Go</button>
			</div>
		</div>
	);
};

export default Fly;
