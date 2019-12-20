import setAttribute from "./setAttribute";

/**
 * 首次渲染 or nodiff渲染
 *
 * @param {vNode} vnode 虚拟dom
 * @param {rootElm} Element 所渲染跟节点
 * @param {REFRESH} string|boolean nodiff 重新渲染标志位
 * @returns {VNode} 添加elm真实dom指针的虚拟dom
 *
 */
const render = (vNode, rootElm, REFRESH) => {
  // 判断直接为string的数据渲染
  if (typeof vNode === "string") {
    return render(
      { props: { nodeValue: vNode }, data: {}, type: "TEXT" },
      rootElm,
      REFRESH
    );
  }
  // 渲染map
  if (Array.isArray(vNode)) {
    return vNode.map(item => render(item, rootElm, REFRESH));
  }
  const { type, props, childrens, data } = vNode;

  const isTextElement = type === "TEXT";
  const dom = isTextElement
    ? document.createTextNode("")
    : document.createElement(type);

  setAttribute(type, props, dom);

  // 递归children
  const childElement = childrens || [];
  childElement.forEach(element => render(element, dom));

  // 插入真实DOM
  if (REFRESH) {
    rootElm.parentNode.replaceChild(dom, rootElm);
  } else {
    rootElm.appendChild(dom);
  }
  // 保存真实dom至所对应虚拟dom
  vNode.elm = dom;

  // 生命周期钩子
  data.hook && data.hook.create && data.hook.create();

  return vNode;
};

export default render;
