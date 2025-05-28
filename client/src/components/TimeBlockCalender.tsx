import React from "react";

const hours = [
  "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
  "6 PM", "7 PM", "8 PM", "9 PM"
];

const TimeBlockCalender = () => {
  return (
    <div className="container">
      <h2>Time Block Calendar</h2>
      <div>
        {hours.map((hour, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span>{hour}</span>
            <input type="text" placeholder="Plan..." style={{ width: "70%" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeBlockCalender;
