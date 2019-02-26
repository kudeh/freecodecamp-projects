const domContainer = document.getElementById('root');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  
  handleChange = (e) => {
    this.setState({text: e.target.value});
    document.getElementById('result').innerHTML = marked(e.target.value);
  }

  render() {
    return (
      <div className="container">
        
        <div className="box">
        <h3>Editor</h3>
        <textarea  placeholder='enter text' onChange={this.handleChange}>
        
        </textarea>
        </div>
        
        <div className="box">
        <h3>Result</h3>
        <div id="result">

        </div>
        </div>

      </div>
    );
  }
}



ReactDOM.render(<App />, domContainer);