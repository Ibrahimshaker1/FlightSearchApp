import React from "react";
import DateRangeIcon from '@mui/icons-material/DateRange';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

function TwoDateComp() {
	return(
		<div className="two-way-date-div">
			<div className="date-container">
				<input type="date" id="go-date" className="date-input"/>
				<DateRangeIcon className="calendar-icon"/>
			</div>
			<div className="two-way-date-icon">
				<SwapHorizIcon className="date-icon" />
			</div>
			<div className="date-container">
				<input type="date" id="back-date" className="date-input"/>
				<DateRangeIcon className="calendar-icon"/>
			</div>
		</div>
	)
}

export default TwoDateComp

