import EReact, { Component } from "../EReact/index";
import EReactDom from "../EReact-dom/index";
import Counter from "./counter";

const Welcome = ({ name }) => <p>Welcome {name}!!!</p>;

const Fake = e => <div>is a Func {e}</div>;

const x = [1, 2, 3, 4, 5, 6, 7];

class App extends Component {
  render() {
    return (
      <div>
        {x.map(item => (
          <div>
            {item}
            {x.map(item => (
              <span>{item}</span>
            ))}
          </div>
        ))}
        {/* <h1 className="primary" style={{ color: "#00f" }}>
          一个简单的标题
          <div>233</div>
        </h1>
        <p style={"color: #0f0;"}>一个简单的内容</p>
        <Welcome name={"EReact"} />
        {Fake(23333)}
        <Counter /> */}
      </div>
    );
  }
}

EReactDom.render(<App />, document.getElementById("root"));
