import React from 'react';

function Form(props) {
    return (
        <form onSubmit={props.saveUserInput}>
            <div>
                <h2>Form</h2>
                <p>Type in data about the event.</p>
            </div>
            <div className="input-container">
                <input name="name" placeholder="Name"/><br/>
                <input name="date" placeholder="Date"/><br/>
                <input name="time" placeholder="Time"/><br/>
                <button className="save-button">Save</button>
            </div>
        </form>
    );
}

export default Form;