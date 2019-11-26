import EReact from "../EReact/index";
import _reconcile from "./reconcile";

// import * as snabbdom from "snabbdom";
// import propsMoudle from "snabbdom/modules/props";
// import eventListenersMoudle from "snabbdom/modules/eventlisteners";

// const reconcile = snabbdom.init([propsMoudle, eventListenersMoudle]);

let rootVNode, rootEl;

const render = (rootDomElement, el) => {
  if (rootVNode == null) {
    // 首次调用
    rootVNode = rootDomElement;
  }
  if (rootEl == null) {
    rootEl = el;
  }
  // 将el渲染值rootDomElement
  // console.log(reconcile(el, rootVNode));
  _reconcile(rootVNode, el);
};

// EReactDom 通知EReact 如何更新Dom
EReact.__updater = componentInstance => {
  // 当调用this.setState 时更新DOM

  // 获取__vNode上存储的 vNode
  const oldVNode = componentInstance.__vNode;

  // 获取新的 vNode
  const newVNode = componentInstance.render();


  console.log({ newVNode, oldVNode });
  // 更新DOM
  // componentInstance.__vNode = reconcile(oldVNode, newVNode);
};

const EReactDom = {
  render
};

export { rootVNode };

export default EReactDom;
