import React from 'react';

function Form(props) {
    console.log(props)
    return (
        <form onSubmit={props.saveUserInput}>
            <h2>Form</h2>
            <p>Type in data about the event.</p>
            <input placeholder="Name"/><br/>
            <input placeholder="Date"/><br/>
            <input placeholder="Time"/><br/>
            <button>Save</button>
        </form>
    );
}

export default Form;