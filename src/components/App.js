import React from 'react';
import Form from './Form';
import Main from './Main';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            event: {
                name: "Next Transit of Venus",
                date: "10 Dec 2117",
                time: "23:58",
                timeLeftInSeconds: ""
            }
        }
        this.saveUserInput = this.saveUserInput.bind(this);
    }

    getTimeInSeconds(timeInput) {
        let timeInSeconds = 0;
        if (timeInput.length >= 4) {
            if (timeInput[1] === ':' || timeInput[2] === ':') {
                const hoursAndMinutes = timeInput.split(':');
                const hours = parseInt(hoursAndMinutes[0]);
                const minutes = parseInt(hoursAndMinutes[1]);
                timeInSeconds = 3600*hours + 60*minutes;
            }
        }
        return timeInSeconds;
    }

    saveUserInput(e) {
        e.preventDefault();
        const eventDateInMiliseconds = Date.parse(e.target.date.value);
        if (isNaN(eventDateInMiliseconds)) {
           console.warn('Please type in a valid date.');
        } else {
            const eventTimeInSeconds = this.getTimeInSeconds(e.target.time.value);
            const eventDateTimeInSeconds = eventDateInMiliseconds / 1000 + eventTimeInSeconds;
            const currentDateTimeInSeconds = Date.parse(new Date()) / 1000;
            let timeLeftInSeconds = 0;
            if (eventDateTimeInSeconds - currentDateTimeInSeconds > 0) {
                timeLeftInSeconds = eventDateTimeInSeconds - currentDateTimeInSeconds;
            }

            let displayTime;
            if (eventTimeInSeconds > 0) {
                displayTime = e.target.time.value;
            } else {
                displayTime = '0:00';
            }

            this.setState({
                event: {
                    name: e.target.name.value,
                    date: e.target.date.value,
                    time: displayTime,
                    timeLeftInSeconds: timeLeftInSeconds
                }
            });
        }
    }

    render() {
        return (
            <div>
                <Form 
                    eventData={this.state.event}
                    saveUserInput={this.saveUserInput}
                />
                <hr/>
                <Main eventData={this.state.event}/>
            </div>
        );
    }
}

export default App;