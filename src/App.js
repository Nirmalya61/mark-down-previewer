const DEFAULT = `# Welcome to my React Markdown Previewer! -- H1.

## This is a sub-heading... --H2.

[Nirmalya Mukherjee](     https://chandan1961.w3spaces.com/index.html?bypass-cache=1638294204)  -- A link.

\`code\`   -- An inline code.
\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}       -- A code block.
\`\`\`
- First item
- Second item
- Third item        -- A list item.

>Block Quotes!     -- A block quote.

![alt text](<img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png">) -- An Image.

  
**This is bold text**... ! -- Bold text.
`; 
const renderer = new marked.Renderer()
renderer.link = (href, title, text) => {
  return `<a href=${href} target="_blank">${text}</a>`
}

const Editor = props => {
  return <textarea id="editor" value={props.input} onChange={props.onChange} />;
};

const Previewer = props => {
  return <div id="preview" dangerouslySetInnerHTML={props.input}/>;
};

const Window = props => {
  return (
    <div className="window">
      <header>
        <h1>{props.heading}</h1>
      </header>
      {props.category}
    </div>
  );
};



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: DEFAULT,
    };
  }

  renderWindow = (heading, category) => {
    return (
      <Window
        heading={heading}
        category={category}
      />
    );
  }

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  }
  
  createMarkUp = () => {
    return {
      __html: marked(this.state.input, {
        breaks: true,
        renderer: renderer,
      })
    }
  }

  render() {
    return (
      <div className="app">
        {this.renderWindow(
          "Editor",
          <Editor onChange={this.handleChange} input={this.state.input} />
        )}
        {this.renderWindow(
          "Markdown Previewer", 
          <Previewer input={this.createMarkUp()} />)}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
