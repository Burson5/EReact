import EReact, { Component } from "../EReact/index";

class Change extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "#f00" };
  }

  change() {
    this.setState({ color: this.state.color === "#f00" ? "#0f0" : "#f00" });
  }

  render() {
    return (
      <div>
        <p style={{ color: this.state.color }}>color: {this.state.color}</p>
        <button onClick={this.change.bind(this)}>count add one</button>
      </div>
    );
  }
}

export default Change;
