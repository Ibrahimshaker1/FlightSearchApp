import React from "react";
import EastIcon from '@mui/icons-material/East';

function ResultApp(props){
	
	const fligthData = {
		logoUrl: props.logoUrl,
		companyName: props.companyName,
		mainDate: new Date(props.departureDate),
		arrivalDate: new Date(props.arrivalDate),
		fromCity: props.fromCity,
		toCity: props.toCity,
		fligthNumber: props.fligthNumber,
		fromAirport: props.fromAirport,
		toAirport: props.toAirport,
		price: props.price,
		timeInHours: function(){
			const timeDifference = this.arrivalDate - this.mainDate;
			const hours = Math.floor(timeDifference / (1000 * 60 * 60));
			const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
			return `${hours} hr ${minutes} min`
		},
	}
	return(
		<div className="result-div">
			<div className="logo-div">
				<img className="company-logo" alt="logo" src={fligthData.logoUrl} />
				<p className="company-name">{fligthData.companyName}</p>
			</div>
			<div className="flight-info">
				<h3 className="main-date">{fligthData.mainDate.toISOString().split("T")[0]}</h3>
				<p className="trip-cities">{fligthData.fromCity}<EastIcon sx={{fontSize: "small",
						padding: "0px 2px", verticalAlign: 'middle', marginBottom: "1px"
					}}/>
					{fligthData.toCity}</p>
				<p className="trip-time">{fligthData.timeInHours()}</p>
			</div>
			<div className="air-port-info">
				<p className="air-port">{fligthData.fromAirport}<EastIcon sx={{fontSize: "small",
						padding: "0px 2px", verticalAlign: 'middle', marginBottom: "2px"
					}}/>{fligthData.toAirport}</p>
				<h3 className="price">{fligthData.price}</h3>
			</div>
		</div>
	)
}

export default ResultApp

