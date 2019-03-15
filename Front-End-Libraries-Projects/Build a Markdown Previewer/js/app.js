import Editor from 'components/Editor.js';

const domContainer = document.getElementById('root');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {markdown: ''};
  }
  
  handleChange = (e) => {
    this.setState({text: e.target.value});
    document.getElementById('result').innerHTML = marked(e.target.value);
  }

  render() {
    return (
      <div className="container">
        
        <Editor markdown={this.state.markdown} onChange={this.handleChange} />

      </div>
    );
  }
}



ReactDOM.render(<App />, domContainer);