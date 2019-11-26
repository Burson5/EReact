import EReact, { Component } from "../EReact/index";
import Change from "./changeColor";
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, value: "123", back: "#0ff", border: "#0f0" };

    // setInterval(() => {
    //   this.setState({ count: this.state.count + 1 });
    // }, 100);
  }
  componentwillMount() {
    console.log("componentwillMount");
  }

  componentDidMount() {
    console.log("componentDidMount");
    // this.setState({ count: this.state.count + 1 });
  }
  countAdd() {
    this.setState({ count: this.state.count + 1 });
  }

  vChange(v) {
    this.setState({ value: v });
  }

  back() {
    this.setState({
      back: this.state.back === "#0ff" ? "#0f0" : "#0ff",
      border: this.state.border === "#0f0" ? "#0ff" : "#0f0"
    });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.countAdd.bind(this)}>count add one</button>
        <br />

        <div
          style={`background: ${this.state.back}; border: 1px solid ${this.state.border};border-radius: 5px;`}
        >
          <Change />
        </div>
        {/* <input
          value={this.state.value}
          onChange={this.vChange.bind(this.value)}
        ></input> */}
        <button onClick={this.back.bind(this)}>click background</button>
      </div>
    );
  }
}

export default Counter;
