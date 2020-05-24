import React from 'react';
import Header from './Header';
import Form from './Form';
import Main from './Main';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "Next Transit of Venus",
            date: "10 Dec 2117",
            time: "23:58",
            timeLeftInSeconds: 0
        }
        this.saveUserInput = this.saveUserInput.bind(this);
        this.formatTimeLeftDisplay = this.formatTimeLeftDisplay.bind(this);
        this.decrementTimeInSeconds = this.decrementTimeInSeconds.bind(this);
    }

    getEventTimeInSeconds(timeInput) {
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
        // Calculate seconds left to the default event (next transit of Venus).
        const timeLeftInSeconds = (Date.parse(this.state.date + ' ' + this.state.time) - Date.parse(new Date())) / 1000;
        this.setState({
            timeLeftInSeconds: timeLeftInSeconds
        });
        // Start decrementing seconds left to the event.
        setInterval(this.decrementTimeInSeconds, 1000);
    }

    decrementTimeInSeconds() {
        if (this.state.timeLeftInSeconds > 0) {
            this.setState(prevState => {
                return {
                    timeLeftInSeconds: prevState.timeLeftInSeconds - 1
                }
            });
        }
    }

    formatTimeLeftDisplay() {
        let timeLeft = this.state.timeLeftInSeconds;

        if (timeLeft <= 0) {
            return 'It\'s happening! Or already happened.';
        }

        let stringForDisplay = '';

        const yearInSeconds = 31556926;
        const monthInSeconds = 2629744;
        const dayInSeconds = 86400;
        const hourInSeconds = 3600;
        const minuteInSeconds = 60;

        if (timeLeft >= yearInSeconds) {
            const yearCount = parseInt(timeLeft / yearInSeconds);
            stringForDisplay += yearCount;
            if (yearCount > 1) {
                stringForDisplay += ' years ';
            } else {
                stringForDisplay += ' year ';
            }
            timeLeft = timeLeft - yearCount * yearInSeconds;
        }
        if (timeLeft >= monthInSeconds) {
            const monthCount = parseInt(timeLeft / monthInSeconds);
            stringForDisplay += monthCount;
            if (monthCount > 1) {
                stringForDisplay += ' months ';
            } else {
                stringForDisplay += ' month ';
            }
            timeLeft = timeLeft - monthCount * monthInSeconds;
        }
        if (timeLeft >= dayInSeconds) {
            const dayCount = parseInt(timeLeft / dayInSeconds);
            stringForDisplay += dayCount;
            if (dayCount > 1) {
                stringForDisplay += ' days ';
            } else {
                stringForDisplay += ' day ';
            }
            timeLeft = timeLeft - dayCount * dayInSeconds;
        }
        if (timeLeft >= hourInSeconds) {
            const hourCount = parseInt(timeLeft / hourInSeconds);
            stringForDisplay += hourCount + ':';
            timeLeft = timeLeft - hourCount * hourInSeconds;
        }
        if (timeLeft >= minuteInSeconds) {
            const minuteCount = parseInt(timeLeft / minuteInSeconds);
            if (minuteCount < 10) {
                stringForDisplay += '0';
            }
            stringForDisplay += minuteCount + ':';
            timeLeft = timeLeft - minuteCount * minuteInSeconds;
        }
        if (timeLeft >= 10) {
            stringForDisplay += timeLeft;
        } else {
            stringForDisplay += '0' + timeLeft;
        }

        return stringForDisplay;
    }

    saveUserInput(e) {
        e.preventDefault();
        const eventDateInMiliseconds = Date.parse(e.target.date.value);
        if (isNaN(eventDateInMiliseconds)) {
           console.warn('Please type in a valid date.');
           alert('Hey, we can\'t start a countdown without properly formatted date!\n\n'
            + 'Please use one of the following formats:\n\n'
            + '2020-10-12\n12-10-2020\n12-10-20\n12 Oct 2020\n12 Oct 20');
        } else {
            const eventTimeInSeconds = this.getEventTimeInSeconds(e.target.time.value);
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
                name: e.target.name.value,
                date: e.target.date.value,
                time: displayTime,
                timeLeftInSeconds: timeLeftInSeconds
            });
        }
    }

    render() {
        return (
            <div>
                <Header/>
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