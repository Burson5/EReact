import EReact, { Component } from "../EReact/index";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };

    // setInterval(() => {
    //   this.setState({ count: this.state.count + 1 });
    // }, 100);
  }

  cc() {
    console.log("cc");
  }
  componentwillMount() {
    console.log("componentwillMount");
    this.setState({ count: this.state.count + 1 });
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.setState({ count: this.state.count + 1 });
  }

  countAdd() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.countAdd.bind(this)}>count add one</button>
      </div>
    );
  }
}

export default Counter;
