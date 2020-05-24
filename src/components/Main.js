import React from 'react';

function Main(props) {
    return (
        <div>
            <h1 className="event-name">{props.eventData.name}</h1>
            <h2 className="event-date">{props.eventData.date}</h2>
        </div>
    );
}

export default Main;