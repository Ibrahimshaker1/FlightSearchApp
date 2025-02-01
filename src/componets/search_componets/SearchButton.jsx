import React from "react";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import axios from "axios";

const mapNames = {
	"Economy": "economy",
	"Premium economy": "premium_economy",
	"Buisness": "business",
	"First": "first"
};
function titleCase(s) {
    return s.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
// callAPI function 
async function getCityData(cityName){
	let cityData = {};
	const options = {
	  method: 'GET',
	  url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
	  params: {
		query: titleCase(cityName),
		locale: 'en-US'
	  },
	  headers: {
		'x-rapidapi-key': import.meta.env.VITE_SECRET_KEY,
		'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
	  }
	};
	try {
		const response = await axios.request(options);
		cityData = response.data
	} catch (error) {
		console.error(error);
		cityData = {"error": "error"}
	}
	return cityData;
}
async function searchFlight(paramsData){
	let searchResult = {}
	if(paramsData["twoDate"]){
		const options = {
		  method: 'GET',
		  url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
		  params: {
			originSkyId: paramsData["originSkyId"],
			destinationSkyId: paramsData["destinationSkyId"],
			originEntityId: paramsData["originEntityId"],
			destinationEntityId: paramsData["destinationEntityId"],
			date: paramsData["oneDate"],
			returnDate: paramsData["twoDate"],
			cabinClass: paramsData["tripType"],
			adults: paramsData["adultNumber"],
			childrens: paramsData["childrenNumber"]
		  },
		  headers: {
			'x-rapidapi-key': import.meta.env.VITE_SECRET_KEY,
			'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
		  }
		};
		try {
			const response = await axios.request(options);
			searchResult = response.data;
		} catch (error) {
			console.error(error);
			searchResult = {"error": "error"}
		}
	}else{
		const options = {
		  method: 'GET',
		  url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
		  params: {
			originSkyId: paramsData["originSkyId"],
			destinationSkyId: paramsData["destinationSkyId"],
			originEntityId: paramsData["originEntityId"],
			destinationEntityId: paramsData["destinationEntityId"],
			date: paramsData["oneDate"],
			cabinClass: paramsData["tripType"],
			adults: paramsData["adultNumber"],
			childrens: paramsData["childrenNumber"]
		  },
		  headers: {
			'x-rapidapi-key': import.meta.env.VITE_SECRET_KEY,
			'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
		  }
		};
		try {
			const response = await axios.request(options);
			searchResult = response.data;
		} catch (error) {
			console.error(error);
			searchResult = {"error": "error"}
		}
	}
	return searchResult
}

//function

function takeDataOneWay(){
	const tripWay = document.getElementById("trip-type").textContent;
	const adultNumber = document.querySelector(".adults-count").textContent;
	const childrenNumber = document.querySelector(".children-count").textContent;
	const tripType = document.getElementById("type-selected").textContent;
	const fromCity = document.getElementById("one-my-city");
	const toCity = document.getElementById("one-to-city");
	const oneDate = document.getElementById("one-way-date");
	if(fromCity.value && toCity.value && oneDate.value){
		return {
			"tripWay": tripWay,
			"adultNumber": adultNumber,
			"childrenNumber": childrenNumber,
			"tripType": mapNames[tripType],
			"fromCity": fromCity.value,
			"toCity": toCity.value,
			"oneDate": oneDate.value
		}
	}else{
		return {
			"error": "empty field",
		}
	}
}

function takeDataTowWay(){
	const tripWay = document.getElementById("trip-type").textContent;
	const adultNumber = document.querySelector(".adults-count").textContent;
	const childrenNumber = document.querySelector(".children-count").textContent;
	const tripType = document.getElementById("type-selected").textContent;
	const fromCity = document.getElementById("one-my-city");
	const toCity = document.getElementById("one-to-city");
	const oneDate = document.getElementById("go-date");
	const twoDate = document.getElementById("back-date");
	if(fromCity.value && toCity.value && oneDate.value && twoDate.value){
		return {
			"tripWay": tripWay,
			"adultNumber": adultNumber,
			"childrenNumber": childrenNumber,
			"tripType": mapNames[tripType],
			"fromCity": fromCity.value,
			"toCity": toCity.value,
			"oneDate": oneDate.value,
			"twoDate": twoDate.value
		}
	}else{
		return {
			"error": "empty field",
		}
	}
}

function SearchButton(props){


	
	async function searchButtonClicked(){
		if(props.tripState == "oneway"){
			props.setAppTrip("oneway")
			const oneWayresults = takeDataOneWay();
			const oneUseDate = new Date(oneWayresults["oneDate"])
			const nowDate = new Date()
			if(oneWayresults["error"]){
				props.setSearch("empty field")
			}else if(oneUseDate < nowDate){
				props.setSearch("time error")
			}else{
				props.setLoodding("25")
				const FromCityData = await getCityData(oneWayresults["fromCity"])
				const ToCityData = await getCityData(oneWayresults["toCity"])
				if(FromCityData["error"] || ToCityData["error"]){
					props.setLoodding("")
					props.setSearch("city name error")
				}else{
					props.setSearch("")
					props.setLoodding("50")
					oneWayresults["originSkyId"] = FromCityData.data[0].skyId
					oneWayresults["destinationSkyId"] = ToCityData.data[0].skyId
					oneWayresults["originEntityId"] = FromCityData.data[0].entityId
					oneWayresults["destinationEntityId"] = ToCityData.data[0].entityId
					oneWayresults["oneDate"] = oneUseDate.toISOString().split("T")[0]
					const mySearchResults = await searchFlight(oneWayresults)
					props.setLoodding("100")
					props.setResultState(mySearchResults.data.itineraries)
					setTimeout(()=>{
						props.setLoodding("")
					}, 1000)
				}
			}
		}else if(props.tripState == "twoway"){
			props.setAppTrip("twoway")
			const twoWayResults = takeDataTowWay();
			const goDate = new Date(twoWayResults["oneDate"]);
			const backDate = new Date(twoWayResults["twoDate"]);
			const nowDate = new Date();
			if(twoWayResults["error"]){
				props.setSearch("empty field")
			}else if(nowDate > goDate || nowDate > backDate || goDate > backDate){
				props.setSearch("time error");
			}else{
				props.setLoodding("25")
				const FromCityData = await getCityData(twoWayResults["fromCity"])
				const ToCityData = await getCityData(twoWayResults["toCity"])
				if(FromCityData["error"] || ToCityData["error"]){
					props.setLoodding("")
					props.setSearch("city name error")
				}else{
					props.setSearch("")
					props.setLoodding("50")
					twoWayResults["originSkyId"] = FromCityData.data[0].skyId
					twoWayResults["destinationSkyId"] = ToCityData.data[0].skyId
					twoWayResults["originEntityId"] = FromCityData.data[0].entityId
					twoWayResults["destinationEntityId"] = ToCityData.data[0].entityId
					twoWayResults["oneDate"] = goDate.toISOString().split("T")[0]
					twoWayResults["twoDate"] = backDate.toISOString().split("T")[0]
					const mySearchResults = await searchFlight(twoWayResults)
					props.setLoodding("100")
					props.setResultState(mySearchResults.data.itineraries)
					setTimeout(()=>{
						props.setLoodding("")
					}, 1000)
				}
			}
		}
	}

	return (
		<div>
			<button className="search-button" onClick={searchButtonClicked}>
				Search<TravelExploreIcon className="search-icon"/>
			</button>
		</div>
	)
}
export default SearchButton

