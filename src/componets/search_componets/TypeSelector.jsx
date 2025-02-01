import React, {useState} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function TypeSelector(props){	
	
	let [typeState, setTypeState] = useState("unclicked");
	let [selectedType, setSelectedType] = useState("Economy");

	if(props.myInfo !== "type-button" && typeState == "clicked" && props.myInfo !== ""){
		typeButtonClicked()
	}
	
	function typeButtonClicked(){
		const downArrow = document.getElementById("t-down-row").classList;
		const classArray = Array.from(downArrow)
		const typeSelectorDrod = document.getElementById("type-selector-drop")
		if (typeState == "unclicked") {
			if(classArray.includes("rotate-arrow-down")){
				downArrow.remove("rotate-arrow-down")
				downArrow.add("rotate-arrow-up")
				typeSelectorDrod.style.display = "flex"
				typeSelectorDrod.classList.add("selector-animation")
			}else{
				downArrow.add("rotate-arrow-up")
				typeSelectorDrod.style.display = "flex"
				typeSelectorDrod.classList.add("selector-animation")
			}
			setTypeState(typeState = "clicked");
		}else if(typeState == "clicked"){
			if(classArray.includes("rotate-arrow-up")){
				downArrow.remove("rotate-arrow-up")
				downArrow.add("rotate-arrow-down")
				typeSelectorDrod.style.display = "none"
				typeSelectorDrod.classList.remove("selector-animation")
			}else{
				downArrow.add("rotate-arrow-down")
				typeSelectorDrod.style.display = "none"
				typeSelectorDrod.classList.remove("selector-animation")
			}
			setTypeState(typeState = "unclicked")
		}
	};
	
	function typeOptionClicked (e, func) {
		const optionButtons = document.querySelectorAll(".type-option")
		const buttonId = e.target.id
		e.target.classList.add("active-option")
		optionButtons.forEach(activeButton => {
			if (activeButton.id != buttonId){
				activeButton.classList.remove("active-option")
			}
		});
		setSelectedType(selectedType = buttonId)
		func()
	}
	

	return(
		<div className="type-selector">
			<button id="type-button" className={typeState == "unclicked" ? "info-button" : "info-button-active"} 
				onClick={ ()=> {typeButtonClicked()}}>
				<div className="trip-selector-list">
					<span><p id="type-selected">{selectedType}</p></span>
					<span className="down-arrow"><KeyboardArrowDownIcon id="t-down-row" 
						sx={{fontSize: "medium"}}/>
					</span>	
				</div>
			</button>
			<div className="type-selector-option" id="type-selector-drop">
				<button className="trip-option type-option" id="Economy" onClick={(e)=>{
					typeOptionClicked(e, typeButtonClicked)
				}}>
					Economy
				</button>
				<button className="trip-option type-option" id="Premium economy" onClick={(e)=>{
					typeOptionClicked(e, typeButtonClicked)
				}}>
					Premium economy
				</button>
				<button className="trip-option type-option" id="Buisness" onClick={(e)=>{
					typeOptionClicked(e, typeButtonClicked)
				}}>
					Buisness
				</button>
				<button className="trip-option type-option" id="First" onClick={(e)=>{
					typeOptionClicked(e, typeButtonClicked)
				}}>
					First
				</button>
			</div>
		</div>
	);
}

export default TypeSelector


