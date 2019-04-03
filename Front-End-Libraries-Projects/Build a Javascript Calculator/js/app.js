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
      displayText: '0',
    }

  }
  
  handleClick = (id, e) => {
    this.setState({displayText: id});
  }
  
  render() {
    
    return (
      <div className="container">
        <div className="logo">
            <i className="fab fa-free-code-camp"></i>
        </div>
        <Display text={this.state.displayText} />
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
      {props.text}
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