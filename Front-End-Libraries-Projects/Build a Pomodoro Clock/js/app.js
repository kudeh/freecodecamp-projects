const domContainer = document.getElementById('app');

class Pomodoro extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getDefaults();
        this.audio = React.createRef()
    }


    getDefaults = () => ({
        session_num: 1,
        session_length: 25,
        break_length: 5,
        in_session: true,
        timer: 1500,
        btnText: 'Start',
        paused: false
    })

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleIncrement = (type, e) => {

        if(this.state.paused || this.state.btnText == 'Start'){
            if(type === "session"){

                length = this.state.session_length;
    
                if(length < 60){
                    this.setState({session_length: length + 1})
                }

                if(length < 60 && this.state.in_session){
                    this.setState({timer: (length+1)*60})
                }
    
            }else {
                length = this.state.break_length;
    
                if(length < 60){
                    this.setState({break_length: length + 1})
                }

                if(length < 60 && !this.state.in_session){
                    this.setState({timer: (length+1)*60})
                }

            }
        }

    }

    handleDecrement = (type, e) => {


        if(this.state.paused || this.state.btnText == 'Start'){
            if(type === "session"){

                length = this.state.session_length;
    
                if(length > 1){
                    this.setState({session_length: length - 1})
                }

                if(length > 1 && this.state.in_session){
                    this.setState({timer: (length-1)*60})
                }
    
            }else {
                length = this.state.break_length;
    
                if(length > 1){
                    this.setState({break_length: length - 1})
                }

                if(length > 1 && !this.state.in_session){
                    this.setState({timer: (length-1)*60})
                }
            }
        }

    }

    handleStartStop = (e) => {
        let text = this.state.btnText;
        

        if(text === "Start" || text === "Resume"){
            
            this.setState({btnText: "Pause", paused: false})

            if (this.interval) {
                this.interval = clearInterval(this.interval);
                return null;
            }
        
            this.interval = setInterval(() => this.setState((prevState) => {

                let in_session = prevState.in_session;
                let session_num = prevState.session_num;
                let timer = prevState.timer;

                if (timer === 0) {

                    //play Audio
                    this.audio.current.play();

                    length = !in_session ? prevState.session_length
                                         : prevState.break_length;
                    session_num = in_session ? session_num : session_num + 1;

                    return {timer: (length*60), in_session: !in_session, session_num: session_num}

                }
        
                return {timer: timer - 1}

            }), 1000);
            
        }else if(text === "Pause"){
            this.setState({btnText: "Resume", paused: true}) 
            if (this.interval) {
                this.interval = clearInterval(this.interval);
                return null;
            }
        }

        
    }


    handleReset = (e) => {
        this.setState(this.getDefaults());
        if (this.interval) {
            this.interval = clearInterval(this.interval);
            return null;
        }
        this.audio.current.load();
    }


    render() {

        return (

             <React.Fragment>
                 <div className="settings-box">
                     <DurationSetter type="session" 
                                     text="Session Length"
                                     length={this.state.session_length}
                                     ids={['session-label', 'session-decrement', 'session-increment', 'session-length']}
                                     handleIncrement={(e) => this.handleIncrement("session", e)}
                                     handleDecrement={(e) => this.handleDecrement("session", e)}
                     />
                     <DurationSetter type="break"
                                     text="Break Length"
                                     length={this.state.break_length}
                                     ids={['break-label', 'break-decrement', 'break-increment', 'break-length']}
                                     handleIncrement={(e) => this.handleIncrement("break", e)}
                                     handleDecrement={(e) => this.handleDecrement("break", e)}
                     />
                 </div>
                 <div className="session-number">
                    <h4>Pomodoro #{this.state.session_num}</h4>
                 </div>
                 <div className="countdown-box">
                    <CountDownTimer in_session={this.state.in_session} 
                                    timer = {this.state.timer}
                     />
                 </div>
                 <div className="button-box">
                     <TimerStatusButton type="reset" text="Reset"
                                        onClick={this.handleReset}
                     />
                     <TimerStatusButton type="start_stop" text={this.state.btnText} 
                                        onClick={this.handleStartStop}
                     />
                 </div>
                 <audio ref={this.audio} id="beep" volume={1.0}
                                         src={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"}/>
             </React.Fragment>

        );
    }

}


const DurationSetter = (props) => {

    let [label, decr, incr, len] = props.ids

    return (
        <div className="duration-box">
            <div className="duration-title">
                <h4 id={label}>{props.text}</h4>
            </div>
            <div className="duration-setting">
                <div  onClick={props.handleDecrement}
                      id={decr} className="decrement">
                      -
                </div>
                <div id={len} className="length">{props.length}</div>
                <div onClick={props.handleIncrement} 
                     id={incr} className="increment">
                     +
                </div>
            </div>
        </div>
    )
}


const CountDownTimer = (props) => {

    let minutes = Math.floor(props.timer/60).toString().padStart(2, '0');
    let seconds = (props.timer%60).toString().padStart(2, '0');
    
    return (
        <div className="timer-box">
            <div className="timer-title">
                <h3 id="timer-label">
                    {props.in_session ? "Session" : "Break"}
                </h3>
            </div>
            <div id="time-left" className="countdown">
                    {minutes+':'+seconds}
            </div>
        </div>
    )
}

const TimerStatusButton = (props) => {

    let type = props.type;
    let text = props.text;

    return (

        <div className="button" onClick={props.onClick}>        
            <h2 id={type} className="btn-text">
                {text}
            </h2>
        </div>

    )
}

ReactDOM.render(
     <Pomodoro/>,
    domContainer
);