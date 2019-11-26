import EReact from "../EReact/index";
import EReactDom from "../EReact-dom/index";
import Counter from "./counter";

const Welcome = ({ name }) => <p>Welcome {name}!!!</p>;

const Fake = e => <div>is a Func {e}</div>;

const App = (
  <div>
    <h1 className="primary" style={{ color: "#00f" }}>
      一个简单的标题
    </h1>
    <p style={"color: #0f0;"}>一个简单的内容</p>
    <Welcome name={"EReact"} />
    {Fake(23333)}
    <Counter />
  </div>
);

// const App2 = (
//   <div>
//     <h1 className="primary">一个简单的标题2</h1>
//     <p>一个简单的内容2</p>
//   </div>
// );

EReactDom.render(App, document.getElementById("root"));
// EReactDom.render(App2, rootVNode);
