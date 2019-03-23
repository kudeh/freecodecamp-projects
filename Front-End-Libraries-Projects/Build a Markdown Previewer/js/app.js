const domContainer = document.getElementById('root');

class App extends React.Component {
  
  constructor(props) {
    
    super(props);
    this.state = {markdown: placeholder,
                  editorMaximized: false,
                  previewerMaximized: false };
    
  }
  
  handleChange = (e) => {
    
    this.setState({markdown: e.target.value});
  
  }
  
  handleEditorMaximize = (e) => {
    
    this.setState({editorMaximized: !this.state.editorMaximized});
    
  }
  
  handlePreviewerMaximize = (e) => {
    
    this.setState({previewerMaximized: !this.state.previewerMaximized});
    
  }
  
  
  

  render() {
    
    const classes = this.state.editorMaximized ? ['editorBox maximize', 'previewerBox hide', 'fa fa-compress']
                  : this.state.previewerMaximized ? ['editorBox hide', 'previewerBox maximize', 'fa fa-compress']  : ['editorBox', 'previewerBox', 'fa fa-arrows-alt'];
    
    return (
      <div className="container">
        
        <div className={classes[0]}>
            <Toolbar title="Editor" icon={classes[2]} onClick={this.handleEditorMaximize}/>
            <Editor markdown={this.state.markdown}  onChange={this.handleChange} />
        </div>
        
        <div className={classes[1]}>
            <Toolbar title="Previewer" icon={classes[2]} onClick={this.handlePreviewerMaximize}/>
            <Previewer  markdown={this.state.markdown} />
        </div>

      </div>
    );
    
  }
}

/**
  Toolbar Component
*/
const Toolbar = (props) => {
  
  return (
  
     <div id='toolbar'>
       <i className="fa fa-free-code-camp"></i>
       <span className="toolbar-title">{props.title}</span>
       <i onClick={props.onClick} className={props.icon}></i>
     </div>
  )
  
}

/**
  Editor Component
*/
const Editor = (props) => {

    return (
      <textarea  id="editor" rows="20" 
    value={props.markdown}
    onChange={props.onChange}
    type="text"></textarea>
    )
}

/**
  Previewer Component
*/
const Previewer = (props) => {
  
  return (
    
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown)}} />
    
    )
  
}


const placeholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`


ReactDOM.render(<App />, domContainer);


