const domContainer = document.getElementById("root");

const calcData = [
  {id: 'clear', text: 'AC'},
  {id: 'divide', text: '/'},
  {id: 'multiply', text: '*'},
  {id: 'seven', text: '7'},
  {id: 'eight', text: '8'},
  {id: 'nine', text: '9'},
  {id: 'subtract', text: '-'},
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
      lastInput: '0',
      lastClicked: ''
    }

  }

  isType = (char) => {
      if(['/', '*', '-', '+'].includes(char)){
          return 'operator';
      }else{
          return 'operand'
      }
  }

  
  
  handleClick = (input, e) => {
    
    let displayText = this.state.displayText;
    let displayTextLastChar = displayText.charAt(displayText.length-1);
    let lastInput = this.state.lastInput; 
    const lastInputType = this.isType(lastInput);
    const thisInputType = this.isType(input);
    let newDisplay = '';
    let newLastInput = '';
    let lastClicked = this.state.lastClicked;


    if(input === '='){

        try {

            if (this.isType(displayTextLastChar) === 'operator' && displayText.length > 1) {
                displayText = displayText.slice(0, displayText.length-1);
            }

            newDisplay = math.eval(displayText)+'';
            newLastInput = newDisplay;

            
        } catch (error) {
    
            newDisplay = '';
            newLastInput = '0';
            
        }

    }else if(input === 'AC') {

        newDisplay = '';
        newLastInput = '0';

    }else if(lastInputType === 'operator' && thisInputType === 'operator'){

        newDisplay = displayText.slice(0, displayText.length-1) + input;
        newLastInput = input;

    }else if (lastInput==='.' && thisInputType === 'operator'){
      newDisplay = displayText;
      newLastInput = lastInput;
    }else if (displayText==='' && (input === '/' || input === '*')){
      newDisplay = displayText;
      newLastInput = lastInput;
    }else if (lastInput === 'Infinity'){
        newDisplay = input;
        newLastInput = input;
    }else if(lastInputType !== thisInputType){

        if(displayText.length > 0){
            newDisplay = displayText + ' ' + input;
        }else {
            newDisplay = input;
        }
            
        newLastInput = input;

    }else {

        if((lastInput.includes('.') && input === '.')){

            newDisplay = displayText;
            newLastInput = lastInput;
            
        }else if(lastInput==='0') {
            if(input === '0'){
              newDisplay = '0';
              newLastInput = '0';
            }else if(input === '.') {
              newDisplay = lastInput+input;
              newLastInput = newDisplay;
            }else{
              newDisplay = input;
              newLastInput = newDisplay;
            }         
        }else {
            if(!(lastClicked === '=') && (lastInput.length <= 21)){
              newDisplay += (displayText + input);
              let newDisplaySplit = newDisplay.split(' ');
              newLastInput = newDisplaySplit[newDisplaySplit.length-1];
            }else {
              newDisplay = displayText;
              newLastInput = lastInput;
            }
            
        }
        
    }

    this.setState({displayText: newDisplay, lastInput: newLastInput, lastClicked: input});

  }
  
  render() {
    
    return (
      <React.Fragment>
      <div className="container">
        <div className="logo">
            <i className="fab fa-free-code-camp"></i>
        </div>
        <Display text={this.state.displayText} lastInput={this.state.lastInput} />
        <div className="grid">
          <KeyPad onClick={this.handleClick} />
        </div>
      </div>
      <div id="footer">
		    <h4>Designed and Coded By</h4>
		    <h4 id="author"><a href="https://github.com/kudeh/freecodecamp-projects">Kene Udeh</a></h4>
	    </div>
      </React.Fragment>
    )
    
  }
  
}

const Display = (props) => {
  return (
    <div id="display-box">
        <div className="expression">{props.text}</div>
        <div id="display" className="last-input">{props.lastInput}</div>
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