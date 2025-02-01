import React, {useState} from "react";
import TripSelector from "./TripSelector";
import PersonSelector from "./PersonSelector.jsx";
import TypeSelector from "./TypeSelector.jsx";

function InfoBar (props) {
	
	let [infoState, setInfoState] = useState("");
	
	setTimeout(()=>{
		const typeButton = document.getElementById("type-button");
		const personButton = document.getElementById("person-button");
		const tripButton = document.getElementById("trip-button");
		typeButton.addEventListener("click", ()=>{
			setInfoState(infoState = "type-button")
		})
		personButton.addEventListener("click", ()=>{
			setInfoState(infoState = "person-button")
		})
		tripButton.addEventListener("click", ()=>{
			setInfoState(infoState = "trip-button")
		})
	}, 1000)

	return(
		<div className="Info-bar-div">
			<TripSelector myInfo={infoState} myTripTypeFunc={props.myFunc}/>
			<PersonSelector myInfo={infoState}/>
			<TypeSelector myInfo={infoState}/>
		</div>
	);
};
export default InfoBar


