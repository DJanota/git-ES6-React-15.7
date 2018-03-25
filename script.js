class Stopwatch extends React.Component {
    constructor() {
        super(); // stopwatch class inherits from react component
        this.reset();
        this.state = {
            isRunning: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }
    }

    reset() {
        const times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
        this.setState({ times });
    }

    format() { 
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {
        if (!this.state.isRunning) { 
            this.setState({ isRunning: true });
            this.watch = setInterval(() => this.step(), 10); 
        }
    }

    step() { // checks if the timer is working
        if (!this.state.isRunning) return;
        this.calculate(); // if so, calculate miliseconds, secs and mins (below)
    }

    calculate() {
        const times = this.state.times;
        times.miliseconds += 1;

        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes += 1;
            times.seconds = 0;
        }

        this.setState({ times }); // object where we store current time after running the timer
    }

    stop() { // stopping the timer: not running, canceling the 'watch' function from start()
        this.setState({ isRunning: false });        
        clearInterval(this.watch);
    }

    restart() { // restarting the timer: it is not running, state reset to "0"
        this.setState({ isRunning: false });        
        this.setState({
            times: {
                miliseconds: 0,
                seconds: 0,
                minutes: 0
            }
        });
    }

    render() {
        return (
            <div className='wrapper'>
                <nav className='controls'>
                    <button onClick={e => this.start(e)}>Start</button>
                    <button onClick={e => this.stop(e)}>Stop</button>
                    <button onClick={e => this.restart(e)}>Reset</button>
                </nav>
                <div className='stopwatch'>{this.format(this.state.times)}</div>
            </div>
        );
    }
}

// pad0 function adds '0' to one-digit numbers
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById('app')); 