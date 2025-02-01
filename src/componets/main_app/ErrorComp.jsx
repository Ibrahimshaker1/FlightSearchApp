import React from "react";

function ErrorComp(props){
	return(
		<div className="error-div">
			<p className="error-text">{props.myText}</p>
		</div>
	)
}
export default ErrorComp

