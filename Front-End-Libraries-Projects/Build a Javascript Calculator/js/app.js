const domContainer = document.getElementById("root");

const calcData = [
  {id: 'clear', text: 'AC'},
  {id: 'divide', text: '/'},
  {id: 'multiply', text: '*'},
  {id: 'seven', text: '7'},
  {id: 'eight', text: '8'},
  {id: 'nine', text: '9'},
  {id: 'substract', text: '-'},
  {id: 'four', text: '4'},
  {id: 'five', text: '5'},
  {id: 'six', text: '6'},
  {id: 'add', text: '+'},
  {id: 'one', text: '1'},
  {id: 'two', text: '2'},
  {id: 'three', text: '3'},
  {id: 'equals', text: '='},
  {id: 'zero', text: '0'},
  {id: 'decimal', text: '.'}
]

class Calculator extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      displayText: '',
      lastInput: '0'
    }

  }

  isType = (char) => {
      if(char in ['/', '*', '-', '+']){
          return 'operator';
      }else if (char == '.'){
          return '.';
      }else if (char == 'AC'){
          return 'clear'
      }else{
          return 'operand'
      }
  }

  
  
  handleClick = (input, e) => {
    
    const displayText = this.state.displayText;
    const lastInput = this.state.lastInput; 
    const lastInputType = this.isType(lastInput);
    const thisInputType = this.isType(input);
    let newDisplay = '';
    let newLastInput = '';
    
    /*if(displayText === '' && lastInputType === 'operand'){
        newDisplay = input;
    }else if(input === 'AC'){
        newDisplay = '';
    }else if(lastInputType === 'operator' && thisInputType === 'operator'){
        newDisplay = displayText.slice(0, displayText.length-1) + input;
    }else if(lastInputType !== thisInputType){
        newDisplay += ' ' + input;
    }else {
        newDisplay += input;
    }*/

    try {

        let result = math.eval(displayText + input);
        
    } catch (error) {

        newDisplay = displayText;
        newLastInput = lastInput;
        
    }finally {

    }


    //this.setState({displayText: newDisplay, lastInput: newDisplay.charAt(newDisplay.length-1)});
    this.setState({displayText: newDisplay, lastInput: newLastInput});
  }
  
  render() {
    
    return (
      <div className="container">
        <div className="logo">
            <i className="fab fa-free-code-camp"></i>
        </div>
        <Display text={this.state.displayText} lastInput={this.state.lastInput} />
        <div className="grid">
          <KeyPad onClick={this.handleClick} />
        </div>
      </div>
    )
    
  }
  
}

const Display = (props) => {
  return (
    <div id="display">
        <div className="expression">{props.text}</div>
        <div classname="last-input">{props.lastInput}</div>
    </div>
  )
}

const KeyPad = (props) => {
  
   return (
     
      calcData.map(a => 
        <Button id={a.id} text={a.text} onClick={(e) => props.onClick(a.text, e)}/>    
      )
     
   )
}

const Button = (props) => {
  return (
     <div id={props.id} className="button" onClick={props.onClick}>
        {props.text}
     </div>
  )
}

ReactDOM.render(<Calculator />, domContainer);