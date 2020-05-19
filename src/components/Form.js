import React from 'react';

function Form(props) {
    console.log(props)
    return (
        <form onSubmit={props.saveUserInput}>
            <h2>Form</h2>
            <p>Type in data about the event.</p>
            <input name="name" placeholder="Name"/><br/>
            <input name="date" placeholder="Date"/><br/>
            <input name="time" placeholder="Time"/><br/>
            <button>Save</button>
        </form>
    );
}

export default Form;