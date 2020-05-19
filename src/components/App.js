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

    saveUserInput(e) {
        e.preventDefault();
        this.setState({
            event: {
                name: e.target.name.value,
                date: e.target.date.value,
                time: e.target.time.value
            }
        });
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