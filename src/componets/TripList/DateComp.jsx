import React from "react";
import DateRangeIcon from '@mui/icons-material/DateRange';

function DateComp() {
	return(
		<div className="date-container">
			<input type="date" id="one-way-date" className="date-input"/>
			<DateRangeIcon className="calendar-icon"/>
		</div>
	)
}

export default DateComp

