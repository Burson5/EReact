import EReact, { Component } from "../EReact/index";
import Change from "./changeColor";
import Change2 from "./changeColor2";
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      value: "123",
      back: "#0ff",
      border: "#0f0",
      class: true
    };

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

  vChange(value) {
    this.setState({ value });
    console.log(value);
  }

  back() {
    this.setState({
      back: this.state.back === "#0ff" ? "#0f0" : "#0ff",
      border: this.state.border === "#0f0" ? "#0ff" : "#0f0"
    });
  }

  change() {
    this.setState({
      class: !this.state.class
    });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button con={"2333"} onClick={this.countAdd.bind(this)}>
          count add one
        </button>
        <br />

        <div
          style={`background: ${this.state.back}; border: 1px solid ${this.state.border};border-radius: 5px;`}
        >
          {this.state.class ? <Change /> : <Change2 />}
        </div>
        <button onClick={this.change.bind(this)}>change</button>
        <input
          value={this.state.value}
          placeholder="2333333"
          onChange={this.vChange.bind(this)}
        />
        <button onClick={this.back.bind(this)}>click background</button>
      </div>
    );
  }
}

export default Counter;
