import __createElement from "./createElement";

const createElement = (type, props = {}, ...children) => {
  // console.log(typeof type, type);

  // babel将ES6-class转译为普通函数
  if (type.prototype && type.prototype instanceof Component) {
    // class实例化 并调用render

    // component 仅实例化一次保存于 instance 中
    if (!type.instance) {
      type.instance = new type(props);

      type.instance.componentwillMount();

      type.instance.__vNode = type.instance.render();
      type.instance.__props = type.instance.props;
      type.instance.__state = type.instance.state;

      // 增加钩子函数（当虚拟DOM被添加到真是DOM节点上时）
      type.instance.__vNode.data.hook = {
        create: () => {
          type.instance.componentDidMount();
        },
        willReceive: (nextProps, preProps) => {
          type.instance.componentWillReceiveProps(nextProps, preProps);
        },
        shouleUpdate: () => {
          type.instance.shouldComponentUpdate();
        },
        updated: () => {
          type.instance.componentDidUpdate();
        },
        unmount: () => {
          type.instance.componentWillUnmount();
        }
      };
    }

    return type.instance.__vNode;
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

  return __createElement(type, props, children);
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
