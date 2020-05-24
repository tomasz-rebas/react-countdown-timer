import React from 'react';
import Form from './Form';
import Main from './Main';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "Next Transit of Venus",
            date: "10 Dec 2117",
            time: "23:58",
            timeLeftInSeconds: 999999999
        }
        this.saveUserInput = this.saveUserInput.bind(this);
        this.formatTimeLeftDisplay = this.formatTimeLeftDisplay.bind(this);
        this.decrementTimeInSeconds = this.decrementTimeInSeconds.bind(this);
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

    componentDidMount() {
        setInterval(this.decrementTimeInSeconds, 1000);
    }

    decrementTimeInSeconds() {
        this.setState(prevState => {
            return {
                timeLeftInSeconds: prevState.timeLeftInSeconds - 1
            }
        });
    }

    formatTimeLeftDisplay() {
        let timeLeft = this.state.timeLeftInSeconds;
        let stringForDisplay = '';

        const yearInSeconds = 31556926;
        const monthInSeconds = 2629744;
        const dayInSeconds = 86400;
        const hourInSeconds = 3600;
        const minuteInSeconds = 60;

        if (timeLeft >= yearInSeconds) {
            const yearCount = parseInt(timeLeft / yearInSeconds);
            stringForDisplay += yearCount + 'y ';
            timeLeft = timeLeft - yearCount * yearInSeconds;
        }
        if (timeLeft >= monthInSeconds) {
            const monthCount = parseInt(timeLeft / monthInSeconds);
            stringForDisplay += monthCount + 'm ';
            timeLeft = timeLeft - monthCount * monthInSeconds;
        }
        if (timeLeft >= dayInSeconds) {
            const dayCount = parseInt(timeLeft / dayInSeconds);
            stringForDisplay += dayCount + 'd ';
            timeLeft = timeLeft - dayCount * dayInSeconds;
        }
        if (timeLeft >= hourInSeconds) {
            const hourCount = parseInt(timeLeft / hourInSeconds);
            stringForDisplay += hourCount + 'h ';
            timeLeft = timeLeft - hourCount * hourInSeconds;
        }
        if (timeLeft >= minuteInSeconds) {
            const minuteCount = parseInt(timeLeft / minuteInSeconds);
            stringForDisplay += minuteCount + 'm ';
            timeLeft = timeLeft - minuteCount * minuteInSeconds;
        }
        stringForDisplay += timeLeft + 's ';

        return stringForDisplay;
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
                    eventData={this.state}
                    saveUserInput={this.saveUserInput}
                />
                <hr/>
                <Main 
                    eventData={this.state}
                    formatTimeLeftDisplay={this.formatTimeLeftDisplay}
                />
            </div>
        );
    }
}

export default App;