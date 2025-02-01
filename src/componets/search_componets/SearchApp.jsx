import React, {useState} from "react";
import InfoBar from "./InfoBar";
import OneTrip from "../TripList/OneTrip.jsx";
import SearchButton from "./SearchButton.jsx";


function SearchApp(props) {
	
	let [tripTypeState, setTripTypeState] = useState("oneway");


	function myTripType(text){
		setTripTypeState(tripTypeState = text)
	};

	return(
		<div className="search-div">
			<InfoBar myFunc={myTripType}/>
			<div className="trip-link-div">
				{tripTypeState == "oneway" ? 
					<OneTrip myId="one-my-city" mySecondId="one-to-city" tripState={tripTypeState}
						myCityPlaceholder="From" toCityPlaceholder="To"
					/> : null
				}
				{tripTypeState == "twoway" ? 
					<OneTrip myId="one-my-city" mySecondId="one-to-city" tripState={tripTypeState}
						myCityPlaceholder="From" toCityPlaceholder="To"
					/> : null
				}
			</div>
			<div className="button-container">
				<SearchButton setResultState={props.setResultState} 
					tripState={tripTypeState} setSearch={props.setSearch}
					setLoodding={props.setLoodding} setAppTrip={props.setAppTrip}
				/>
			</div>
		</div>
	)
}
export default SearchApp

