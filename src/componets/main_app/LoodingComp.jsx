import React from "react";

function LooddingComp(props){
	const animClass = props.animactionClass
	const myClass = "loodding-div" + " " + animClass
	return(
		<div className={`loodding-div ${myClass}`} id="loodding">
		</div>
	)
}
export default LooddingComp


