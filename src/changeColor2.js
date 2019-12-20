import EReact, { Component } from "../EReact/index";

let x = ["map1", "map2", "map3", "map4", "map5"];
class Change extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "#000", visiable: true };
  }

  componentDidMount() {
    console.log("change color component init");
    // setTimeout(() => {
    //   this.setState({ visiable: false });
    // }, 5000);
  }

  change() {
    this.setState({ color: this.state.color === "#f00" ? "#0f0" : "#f00" });
  }

  render() {
    return this.state.visiable ? (
      <div>
        <p style={{ color: this.state.color }}>color2: {this.state.color}</p>
        <button onClick={this.change.bind(this)}>count add one</button>
        {/* {x.map(item => (
          <div>{item}</div>
        ))} */}
      </div>
    ) : (
      "2333"
    );
  }
}

export default Change;
