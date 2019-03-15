const Editor = ({props}) => {

    return (<textarea id="editor"
    value={markdown}
    onChange={onChange}
    type="text"></textarea>);
}

module.exports = Editor;