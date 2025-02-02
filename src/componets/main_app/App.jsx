import React, {useState, useEffect} from "react";
import Logo from "./logo.jsx";
import SearchApp from "../search_componets/SearchApp.jsx";
import ErrorComp from "./ErrorComp.jsx";
import LooddingComp from "./LoodingComp.jsx";
import ResultApp from "../result_list/ResultApp.jsx";

//functions
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('show-div');
			observer.unobserve(entry.target);
		}
	})},{threshold: 0.4,});

function makeResultComp(resultData, myIndex){
	const logo = resultData.legs[0].carriers.marketing[0].logoUrl;
	const companyName = resultData.legs[0].carriers.marketing[0].name;
	const departureDate = resultData.legs[0].departure;
	const arrivalDate = resultData.legs[0].arrival;
	const fromCity = resultData.legs[0].origin.city;
	const toCity = resultData.legs[0].destination.city;
	const fromCityAirport = resultData.legs[0].origin.displayCode;
	const toCityAirport = resultData.legs[0].destination.displayCode;
	const flightNumber = resultData.legs[0].segments[0].flightNumber;
	const price = resultData.price.formatted
	return(
		<ResultApp key={myIndex} logoUrl={logo} companyName={companyName} departureDate={departureDate} 
			arrivalDate={arrivalDate} fromCity={fromCity} toCity={toCity} fligthNumber={flightNumber} 
			fromAirport={fromCityAirport} toAirport={toCityAirport} price={price}
		/>
	)

}
function makeReturnResultComp(resultData, myIndex){
	const logo = resultData.legs[1].carriers.marketing[0].logoUrl;
	const companyName = resultData.legs[1].carriers.marketing[0].name;
	const departureDate = resultData.legs[1].departure;
	const arrivalDate = resultData.legs[1].arrival;
	const fromCity = resultData.legs[1].origin.city;
	const toCity = resultData.legs[1].destination.city;
	const fromCityAirport = resultData.legs[1].origin.displayCode;
	const toCityAirport = resultData.legs[1].destination.displayCode;
	const flightNumber = resultData.legs[1].segments[0].flightNumber;
	const price = resultData.price.formatted
	return(
		<ResultApp key={myIndex - 1000} logoUrl={logo} companyName={companyName} departureDate={departureDate} 
			arrivalDate={arrivalDate} fromCity={fromCity} toCity={toCity} fligthNumber={flightNumber} 
			fromAirport={fromCityAirport} toAirport={toCityAirport} price={price}
		/>
	)

}


function App () {
	
	let [resultList, setResultList] = useState([]);
	let [searchState, setSearchState] = useState("");
	let [trackLodding, setTrackLodding] = useState("");
	let [appTripType, setAppTripType] = useState("");

	useEffect( () => {
		setTimeout(()=>{
			try{
				const resultDivs = document.querySelectorAll(".result-div")
				resultDivs.forEach((item) => {
					observer.observe(item);
				});
			}catch{
					
			}
		}, 1000)
	}, [resultList])

	function changeAppTripType(type){
		setAppTripType(appTripType = type)
	}
	
	function changeSearchState(state){
		setSearchState(searchState = state)
	}

	function changeResultState(result){
		setResultList(resultList = result)
	};

	function changeTrackLodding(lodding){
		setTrackLodding(trackLodding = lodding)
	}
	
	return(
		<div className="main-app">
			<Logo />
			<SearchApp setResultState={changeResultState} setSearch={changeSearchState} 
				setLoodding={changeTrackLodding} setAppTrip={changeAppTripType}
			/>
			{ searchState=="empty field" ?  <ErrorComp myText="All Field Must Be Full" /> : null}
			{ searchState=="time error" ?  <ErrorComp myText="Date Must Be In Future" /> : null}
			{ searchState=="city name error" ?  <ErrorComp myText="Have Problem in City Name" /> : null}
			{ trackLodding == "25" ? <LooddingComp animactionClass="loodding-25"/> : null}
			{ trackLodding == "50" ? <LooddingComp animactionClass="loodding-50"/> : null}
			{ trackLodding == "100" ? <LooddingComp animactionClass="loodding-100"/> : null}
			{ appTripType == "oneway" || appTripType == "twoway" ? resultList.map(makeResultComp) : null}
			{ appTripType == "twoway" ? resultList.map(makeReturnResultComp) : null}
		</div>
	)
}
export default App

