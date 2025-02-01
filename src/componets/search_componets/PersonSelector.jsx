import React, {useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function PersonSelector (props) {
	
	let [personState, setPersonState] = useState("unclicked")
	let [personCount, setPersonCount] = useState(1);
	let [adultsCount, setAdultsCount] = useState(1);
	let [childrenCount, setClidrenCount] = useState(0);

	if(props.myInfo !== "person-button" && personState == "clicked" && props.myInfo !== ""){
		personButtonClicked()
	}

	function addChildren () {
		setClidrenCount(childrenCount = childrenCount + 1);
		setPersonCount(personCount= personCount + 1);
	};

	function removeChildren (){
		if(childrenCount > 0){		
			setClidrenCount(childrenCount = childrenCount - 1);
			setPersonCount(personCount= personCount - 1);
		}
	};

	function addAdults (){
		setAdultsCount(adultsCount = adultsCount + 1)
		setPersonCount(personCount= personCount + 1);
	}
	
	function removeAdults (){
		if(adultsCount > 1){
			setAdultsCount(adultsCount = adultsCount - 1)
			setPersonCount(personCount= personCount - 1);
		}
	}

	
	function personButtonClicked() {
		const downArrow = document.getElementById("p-down-row").classList;
		const classArray = Array.from(downArrow)
		const personDrod = document.getElementById("person-selector-drop");
		if (personState == "unclicked") {
			if(classArray.includes("rotate-arrow-down")){
				downArrow.remove("rotate-arrow-down")
				downArrow.add("rotate-arrow-up")
				personDrod.classList.add("selector-animation")
				personDrod.style.display = "flex";
			}else{
				downArrow.add("rotate-arrow-up")
				personDrod.classList.add("selector-animation")
				personDrod.style.display = "flex";
			}
			setPersonState(personState = "clicked")
		}else if(personState == "clicked"){
			if(classArray.includes("rotate-arrow-up")){
				downArrow.remove("rotate-arrow-up")
				downArrow.add("rotate-arrow-down")
				personDrod.classList.remove("selector-animation")
				personDrod.style.display = "none";
			}else{
				downArrow.add("rotate-arrow-down")
				personDrod.classList.remove("selector-animation")
				personDrod.style.display = "none";
			}
			setPersonState(personState = "unclicked")
		}
	};


	return(
		<div className="person-selector">
			<button id="person-button" className={personState == "unclicked" ? "info-button" : "info-button-active"}
				onClick={ ()=> {personButtonClicked()}}>
				<div className="trip-selector-list">
					<span className="person-span"><PersonIcon sx={{fontSize: "medium"}}/></span>
					<span><p id="person-count">{personCount}</p></span>
					<span className="down-arrow"><KeyboardArrowDownIcon id="p-down-row" 
						sx={{fontSize: "medium"}}/>
					</span>	
				</div>
			</button>
			<div className="person-selector-options" id="person-selector-drop">
				<div className="text-div">
					<p className="adults-text">Adults</p>
					<p className="children-text">Children</p>
					<p className="sub-children-text">Age2-11</p>
				</div>
				<div className="buttons-div">
					<div className="adutls-counter">
						<button className="remove-button" onClick={ ()=>{removeAdults()} }><RemoveIcon /></button>
						<p className="adults-count">{adultsCount}</p>
						<button className="add-button" onClick={()=>{addAdults()}}><AddIcon /></button>
					</div>
					<div className="children-counter">
						<button className="remove-button" onClick={()=>{removeChildren()}}><RemoveIcon /></button>
						<p className="children-count">{childrenCount}</p>
						<button className="add-button" onClick={()=>{addChildren()}}><AddIcon /></button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PersonSelector


