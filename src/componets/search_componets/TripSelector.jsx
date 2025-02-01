import React, {useState, useRef} from "react";
import EastIcon from '@mui/icons-material/East';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const arrowType = {
	oneway: <EastIcon sx={{fontSize: "small"}}/>,
	twoway: <SyncAltIcon sx={{fontSize: "small"}}/>,
}

const selectorTitle = {
	oneway: "One Way",
	twoway: "Round Trip",
}


function TripSelector (props) {
	let [tripState, setTripState] = useState("unclicked")
	let [tripType, setTripType] = useState("oneway");

	if(props.myInfo !== "trip-button" && tripState == "clicked" && props.myInfo !== ""){
		tripButtonCliked();
	};

	function tripButtonCliked () {
		const downArrow = document.getElementById("down-row").classList;
		const classArray = Array.from(downArrow);
		if (tripState == "unclicked"){
			const tripDrop = document.getElementById("trip-selector-drop")
			if (classArray.includes("rotate-arrow-down")){
				downArrow.remove("rotate-arrow-down")
				downArrow.add("rotate-arrow-up")
				tripDrop.classList.add("selector-animation")
				tripDrop.style.display = "flex";
			}else{
				downArrow.add("rotate-arrow-up")
				tripDrop.classList.add("selector-animation")
				tripDrop.style.display = "flex";
			}
			setTripState(tripState="clicked")
		}else if(tripState == "clicked"){
			const tripDrop = document.getElementById("trip-selector-drop")
			if (classArray.includes("rotate-arrow-up")) {
				downArrow.remove("rotate-arrow-up");
				downArrow.add("rotate-arrow-down")
				tripDrop.classList.remove("selector-animation")
				tripDrop.style.display = "none";
			}else{
				downArrow.add("rotate-arrow-down")
				tripDrop.classList.remove("selector-animation")
				tripDrop.style.display = "none";
			}
			setTripState(tripState="unclicked")
		};
	};


	function optionClicked (e, func) {
		const optionButtons = document.querySelectorAll(".trip-option")
		const buttonId = e.target.id
		e.target.classList.add("active-option")
		optionButtons.forEach(activeButton => {
			if (activeButton.id != buttonId){
				activeButton.classList.remove("active-option")
			}
		});
		setTripType(tripType = buttonId)
		props.myTripTypeFunc(buttonId)
		func()
	}


	return(
		<div className="trip-selector">
			<button id="trip-button" className={tripState == "unclicked" ? "info-button" : "info-button-active"} onClick={ ()=> {tripButtonCliked()} }>
				<div className="trip-selector-list">
					<span className="arrow-icon">{arrowType[tripType]}</span>
					<span><p id="trip-type">{selectorTitle[tripType]}</p></span>
					<span className="down-arrow"><KeyboardArrowDownIcon id="down-row" 
						sx={{fontSize: "medium"}}/>
					</span>	
				</div>
			</button>
			<div className="trip-selector-option" id="trip-selector-drop">
				<button className="trip-option" id="oneway" onClick={(e)=>{optionClicked(e, tripButtonCliked)}}>
					One Way
				</button>
				<button className="trip-option" id="twoway" onClick={(e)=>{optionClicked(e, tripButtonCliked)}}>
					Round Trip
				</button>
			</div>
		</div>
	);
};
export default TripSelector

