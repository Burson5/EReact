import { h } from "snabbdom";
import $createElement from "./createElement";

const createElement = (type, props = {}, ...children) => {
  // console.log(typeof type, type);

  // babel将ES6-class转译为普通函数
  if (type.prototype && type.prototype instanceof Component) {
    // class实例化 并调用render
    const componentInstance = new type(props);
    componentInstance.componentwillMount();
    componentInstance.__vNode = componentInstance.render();
    componentInstance.__props = componentInstance.props;
    componentInstance.__state = componentInstance.state;

    // 增加钩子函数（当虚拟DOM被添加到真是DOM节点上时）
    componentInstance.__vNode.data.hook = {
      create: () => {
        componentInstance.componentDidMount();
      },
      willReceive: (nextProps, preProps) => {
        componentInstance.componentWillReceiveProps(nextProps, preProps);
      },
      shouleUpdate: () => {
        componentInstance.shouldComponentUpdate();
      },
      updated: () => {
        componentInstance.componentDidUpdate();
      },
      unmount: () => {
        componentInstance.componentWillUnmount();
      }
    };

    return componentInstance.__vNode;
  }

  if (typeof type === "function") {
    // 函数组件调用
    return type(props);
  }

  // let dataProps = {};
  // let eventProps = {};

  // for (let propKey in props) {
  //   // event 属性总是以 `on` 开头
  //   if (propKey.startsWith("on")) {
  //     const event = propKey.substring(2).toLowerCase();
  //     eventProps[event] = props[propKey];
  //   } else {
  //     dataProps[propKey] = props[propKey];
  //   }
  // }

  // return h(type, { props: dataProps, on: eventProps }, children);

  return $createElement(type, props, children);
};

class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  componentwillMount() {}
  componentDidMount() {}
  componentWillReceiveProps() {}
  shouldComponentUpdate() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  setState(partialState) {
    this.state = {
      ...this.state,
      ...partialState
    };

    // EReactDom __updater 方法
    EReact.__updater(this);
  }

  render() {}
}

const EReact = {
  createElement,
  Component
};

export { Component };

export default EReact;
