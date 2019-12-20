import EReact from "../EReact/index";
import _render from "./render";
// import diff from "./diff";

let rootVNode, rootEl;

const render = (vNode, el) => {
  if (rootVNode == null) {
    // 首次调用
    rootVNode = vNode;
  }
  if (rootEl == null) {
    rootEl = el;
  }
  console.log(rootVNode)
  // 将rootDomElement渲染至el 渲染虚拟dom
  rootVNode = _render(rootVNode, el);
};

// EReactDom 通知EReact 如何更新Dom
EReact.__updater = instance => {
  // 当调用this.setState 时更新DOM

  // 获取__vNode上存储的 vNode
  const oldVNode = instance.__vNode;

  // 获取新的 vNode
  const newVNode = instance.render();

  console.log({ instance, newVNode, oldVNode }, oldVNode.elm);

  // 使用 对比新旧虚拟DOM更新
  // const container = oldVNode.elm.parentNode;
  // instance.__vNode = diff(oldVNode, newVNode, container);

  // 更新DOM no diff
  instance.__vNode = _render(newVNode, oldVNode.elm, "REFRESH");
  instance.__props = instance.props;
  instance.__state = instance.state;


};

const EReactDom = {
  render
};

export { rootVNode };

export default EReactDom;
