import React, {useEffect, useState} from "react";
import DateComp from "./DateComp.jsx";
import TwoDateComp from "./ToDateComp.jsx"
import axios from "axios";

//const values 
const cityList = ['New York', 'Los Angeles', 'London', 'Paris', 'Tokyo', 'Dubai', 'Berlin', 'Toronto',
'Sydney', 'Shanghai', 'Mumbai', 'Hong Kong', 'Singapore', 'Madrid', 'Rome', 'Istanbul', 'Mexico City', 'Moscow',
'San Francisco', 'São Paulo', 'Kuala Lumpur', 'Bangkok', 'Seoul', 'Cairo', 'Cape Town', 'Lagos', 
'Barcelona', 'Athens', 'Rio de Janeiro', 'Melbourne', 'Beijing', 'Frankfurt', 'Zurich', 'Vienna', 'Jeddah', 
'Delhi', 'Buenos Aires', 'Jakarta', 'Manila', 'Santiago', 'Lima', 'Milan', 'Montreal', 'Vancouver', 'Dublin',
'Helsinki', 'Lisbon'];


//function
async function getCityName(lat, log){
	let resResult = "";
	const options = {
	  method: 'GET',
	  url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports',
	  params: {
		lat: lat,
		lng: log,
	  },
	  headers: {
		'x-rapidapi-key': import.meta.env.VITE_SECRET_KEY,
		'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
	  }
	};

	try {
		const response = await axios.request(options);
		resResult = response.data;
	} catch (error) {
		resResult = "error";
	}
	return resResult
}

function returnFiltredNames(name, nameIndex){
	return(
		<div className="from-name-selector filtre-name-div" key={nameIndex} id={nameIndex}>
			<p className="filtre-name" key={nameIndex}>{name}</p>
		</div>
	);
}
function returnFiltredToCities(name, nameIndex){
	return(
		<div className="to-name-selector filtre-name-div" key={nameIndex} id={nameIndex}>
			<p className="filtre-name" key={nameIndex}>{name}</p>
		</div>
	);
}

function OneTrip(props){
	
	let [fromCitys, setFromCitys] = useState(cityList);
	let [toCitys, setToCitys] = useState(cityList);
	let [toCityClicked, setToCityClicked] = useState("");
	let [fromCityClick, setFromCityClick] = useState("");
	if (fromCityClick == "true") {
		const fromList = document.getElementById("from-list")
		fromList.style.display = "flex";
		const cityNamesElements = document.querySelectorAll(".from-name-selector")
		cityNamesElements.forEach((nameDiv)=>{
			nameDiv.addEventListener("click", (e)=>{
				const myCityInput = document.getElementById(props.myId);
				myCityInput.value = e.target.textContent;
				fromList.style.display = "none";
				setFromCityClick(fromCityClick = "")
			});
		});
	}else if(fromCityClick == "false"){
		const fromList = document.getElementById("from-list")
		fromList.style.display = "none";
	}
	if(toCityClicked == "true"){
		const toList = document.getElementById("to-list");
		toList.style.display = "flex"
		const toCityNamesElements = document.querySelectorAll(".to-name-selector")
		toCityNamesElements.forEach( (ToCityName) => {
			ToCityName.addEventListener("click", (e)=>{
				const toCityInput = document.getElementById(props.mySecondId);
				toCityInput.value = e.target.textContent;
				toList.style.display = "none";
				setToCityClicked(toCityClicked = "");
			});
		});
	}
	function toInputFouse(){
		setToCityClicked(toCityClicked = "true");
	}
	function toInputOutFouse(){
		document.addEventListener("click", (e)=>{
			const toList = document.getElementById("to-list")
			if(e.target !== toList && toCityClicked == "true"){
				setToCityClicked(toCityClicked = "");	
				toList.style.display = "none";
			}
		})
	}

	function fromInputFouse(){
		setFromCityClick(fromCityClick = "true")
	}
	function fromInputOutFouse(){
		const nameSelector = document.getElementById(".from-list")
		document.addEventListener("click", (e)=>{
			if(nameSelector !== e.target && fromCityClick == "true"){
				setFromCitys(fromCitys = cityList)
				setFromCityClick(fromCityClick = "false")
			}
		})
	}
	function searchCitiesValue(e){
		const searchValue = e.target
		setTimeout(() => {
			if (searchValue.value){
				function filterCities(searchChar) {
				  return cityList.filter(city => city.toLowerCase().includes(searchChar.toLowerCase()));
				}
				const fromFilterList = filterCities(searchValue.value)
				setFromCitys(fromCitys = fromFilterList)
			}else{
				setFromCitys(fromCitys = cityList)
			}
		}, 1000)
	}
	function searchToCitiesValue(e){
		const searchValue = e.target
		setTimeout(() => {
			if (searchValue.value){
				function filterCities(searchChar) {
				  return cityList.filter(city => city.toLowerCase().includes(searchChar.toLowerCase()));
				}
				const ToFilterList = filterCities(searchValue.value)
				setToCitys(toCitys = ToFilterList)
			}else{
				setToCitys(toCitys = cityList)
			}
		}, 1000)
	}
	async function getPosition(p){
		const myCityInput = document.getElementById(props.myId);
		const lat = p.coords.latitude;
		const lng= p.coords.longitude;
		if(lat && lng){
			const cityNameRespose = await getCityName(lat, lng);
			const cityName = cityNameRespose.data.current.presentation.title;
			myCityInput.value = cityName;
		};
	}
	function getLogLat () {
		if(navigator.geolocation){
			try{
				navigator.geolocation.getCurrentPosition(getPosition); 
			}catch{
				console.log("can't take position")
			}
		}
	}

	useEffect(()=> {
		// function exGetCityName(){
		// 	getLogLat();
		// }
		// exGetCityName()
	}, [])

	return(
		<div className="one-trip-div">
			<div className="city-name-div">
				<div className="main-city">
					<div className="main-city-input">
						<input type="text" className="one-main-input my-input" 
							id={props.myId}
							onFocus={fromInputFouse}
							onBlur={fromInputOutFouse}
							placeholder={props.myCityPlaceholder}
							onChange={searchCitiesValue}
						/>
					</div>
					<div className="main-city-list" id="from-list">
						{fromCitys.map(returnFiltredNames)}
					</div>
				</div>
				<div className="one-second-city">
					<div className="one-second-city-input">
						<input type="text" className="one-second-input my-input" id={props.mySecondId}
							placeholder={props.toCityPlaceholder}	
							onFocus={toInputFouse}
							onBlur={toInputOutFouse}
							onChange={searchToCitiesValue}
						/>
					</div>
					<div className="one-second-city-list" id="to-list">
						{toCitys.map(returnFiltredToCities)}
					</div>
				</div>
			</div>
			<div className="one-date-div">
				{ props.tripState == "oneway" ? <DateComp /> : <TwoDateComp />}
			</div>
		</div>
	)
}

export default OneTrip

