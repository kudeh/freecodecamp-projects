const domContainer = document.getElementById("root");

const keyMap = {
    
    Q: {
      names: ['Heater 1', 'Chord 1'],
      urls: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3','https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3']
      
    },
    W: {
      names: ['Heater 2', 'Chord 2'],
      urls: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3','https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3']
      
    },
    E: {
      names: ['Heater 3', 'Chord 3'],
      urls: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3','https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3']
      
    },
    A: {
      names: ['Heater 4', 'Shaker'],
      urls: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3','https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3']
      
    },
    S: {
      names: ['Clap', 'Open-HH'],
      urls: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3','https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3']
      
    },
    D: {
      names: ['Clap', 'Open-HH'],
      urls: ['https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3','https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3']
      
    },
    Z: {
      names: ["Kick-n'-Hat", 'Punchy-Kick'],
      urls: ['https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3','https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3']
      
    },
    X: {
      names: ["Kick", 'Side-Stick'],
      urls: ['https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3','https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3']
      
    },
    C: {
      names: ["Closed-HH", 'Snare'],
      urls: ['https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3','https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3']
      
    }
    
  };

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
       power: true,
       bank: 0,
       volume: 30,
       key: '',
       text: '',
       url: ''
    }
  }
 
  
  handlePowerSwitch = (e) => {
    this.setState({power: !this.state.power, key:'', text:''})
  }
  
  handleVolumeChange = (e) => {
    this.setState({volume: e.target.value, text: this.state.power ? 'Volume: '+e.target.value : ''})
  }
  
  handleVolumeRelease = (e) => {
    this.setState({text: '', volume: e.target.value})
  }
  
  handleKeyClicked = (keyName, e) => {
    
     if(this.state.power ){
    
      this.setState({key: keyName}, () => {
      let url = keyMap[this.state.key].urls[this.state.bank];
      let name = keyMap[this.state.key].names[this.state.bank];
      
      console.log(url, name, keyName);
      this.setState({text: name, url: url}, () => {
        let audio = document.getElementById(keyName);
        audio.play();
      });   

    });
       
     }
    
  }
  
  handleBankToggle = (e) => {
    this.setState({bank: this.state.bank ? 0 : 1,
                  text: !this.state.power ? '' : this.state.bank ? 'Heater Kit' : 'Smooth Piano Kit'})
    console.log(this.state.bank, this.state.text)
  }
  
  render () {
    
    return (
      
      <div id="drum-machine" className="container">
        
        <div className="logo">
          <i className="fa fa-free-code-camp"></i>
        </div>
        
        
        <div className="board">
          <Keyboard 
          keys={['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']}
          onKeyPress={this.handleKeyClicked}
          onClick={this.handleKeyClicked}
          volume={this.state.volume}
          bank={this.state.bank}
          url={this.state.url}
          />
        
        <div className="pane">
            <div className={this.state.power ? "power" : "power red"} onClick={this.handlePowerSwitch}>
              <i className="fa fa-power-off"></i>
            </div>
            <div id="display" className="display">
                {this.state.text}
            </div>
            <div class="volumecontainer">
                <input type="range" min="1" max="100" value={this.state.volume} className="volume" id="myRange" onChange={this.handleVolumeChange} onMouseUp={this.handleVolumeRelease}/>
          </div>
          <div className="bankContainer">
            <p>Bank:</p>
            <div className="bank" onClick={this.handleBankToggle}>
              <div className={this.state.bank ? "toggle right" : "toggle left"} >
                
              </div>
            </div>
          </div>
        </div>
        </div>
              </div>
      
    )
  }
  
}

/**
  Key Component
*/
const Key = (props) => {
  
  return (
    
    <div id={props.name+"-drumpad"} className="drum-pad" onClick={props.onClick} onKeyPress={props.onKeyPress}>
      {props.name}
      <audio className="clip" id={props.name} volume={props.volume} src={props.url} type="audio/mp3"></audio>  

    </div>
    
  )
} 

/**
  Keyboard Component
*/
const Keyboard = (props) => {
  
  return (
     
     <div className="keyboard">
        {props.keys.map(
          (k, index) => <Key key={index} name={k} volume={props.volume} url={keyMap[k].urls[props.bank]} onClick={(e) => props.onClick(k, e)} onKeyPress={(e) => props.onKeyPress(k, e)}/>
        ) }
     </div>
  
  )
  
}

ReactDOM.render(<App />, domContainer)