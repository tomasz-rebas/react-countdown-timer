import React from 'react';

function Form(props) {
    return (
        <form onSubmit={props.saveUserInput}>
            <div>
                <h2>Form</h2>
                <p className="info">Type in data about your event</p>
            </div>
            <div className="input-container">
                <input name="name" placeholder="Name" defaultValue={props.eventData.name}/><br/>
                <input name="date" placeholder="Date (e.g. 12 Oct 2020)" defaultValue={props.eventData.date}/><br/>
                <input name="time" placeholder="Time (e.g. 23:50)" defaultValue={props.eventData.time}/><br/>
                <button className="save-button">Save</button>
            </div>
        </form>
    );
}

export default Form;