import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

const DatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
    props.onDate(date);
  };

  return (
    // <div className="date-picker container">
    // <Calendar onChange={onChange} value={date} />
    <div>
    // </div>
  );
};

export default DatePicker;
