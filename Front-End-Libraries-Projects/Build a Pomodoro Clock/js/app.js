const domContainer = document.getElementById('app');

class Pomodoro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session_num: 1,
            session_length: 25,
            break_length: 5,
            in_session: true,
            countdown_at: 25
        }
    }


    render() {

        return (

             <React.Fragment>
                 <div className="session-number">
                    <h2>Session #{this.state.session_num}</h2>
                 </div>
                 <div className="settings-box">
                     <DurationSetter type="session" 
                                     text="Session Label"
                                     length={this.state.session_length}
                                     ids={['session-label', 'session-decrement', 'session-increment', 'session-length']}
                     />
                     <DurationSetter type="break"
                                     text="Break Label"
                                     length={this.state.break_length}
                                     ids={['break-label', 'break-decrement', 'break-increment', 'break-length']}
                     />
                 </div>
                 <div className="countdown-box">
                    <CountDownTimer in_session={this.state.in_session} />
                 </div>
                 <div className="button-box">
                     <TimerStatusButton type="reset" text="Reset" />
                     <TimerStatusButton type="start_stop" text="Start" />
                 </div>
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
                <div id={decr} className="decrement">-</div>
                <div id={len} className="length">{props.length}</div>
                <div id={incr} className="increment">+</div>
            </div>
        </div>
    )
}


const CountDownTimer = (props) => {
    
    return (
        <div className="timer-box">
            <div className="timer-title">
                <h3 id="timer-label">
                    {props.in_session ? "Session" : "Break"}
                </h3>
            </div>
            <div id="time-left" className="countdown">
                <div className="minute">

                </div>
                <div className="seconds">

                </div>
            </div>
        </div>
    )
}

const TimerStatusButton = (props) => {

    let type = props.type;
    let text = props.text;

    return (

        <div className="button">        
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