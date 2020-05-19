import React from 'react';
import Form from './Form'

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            event: {
                name: "",
                date: "",
                time: ""
            }
        }
        this.saveUserInput = this.saveUserInput.bind(this);
    }

    saveUserInput(event) {
        event.preventDefault();
        console.log('User input saved!');
        console.log(event.target);
    }

    render() {
        return (
            <div>
                <Form 
                    eventData={this.state.event}
                    saveUserInput={this.saveUserInput}
                />
            </div>
        );
    }
}

export default App;