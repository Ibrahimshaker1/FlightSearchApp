import React from "react";
import {createRoot} from "react-dom/client";
import App from "./componets/main_app/App.jsx";


const root = createRoot(document.getElementById("root"));
root.render(
	<div className="main-div">
		<div className="image-container">
		</div>
		<div className="app">
			<App />
		</div>	
	</div>
)


