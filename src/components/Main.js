import React from 'react';

function Main(props) {
    return (
        <div>
            <h1 className="event-name">{props.eventData.name}</h1>
            <h2 className="event-date">{props.eventData.date}, {props.eventData.time}</h2>
            <h2 className="event-time-left">{props.formatTimeLeftDisplay()}</h2>
        </div>
    );
}

export default Main;