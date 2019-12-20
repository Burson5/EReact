import setAttribute from "./setAttribute";
import render from "./render";

const diffText = (oldVNode, newVNode) => {
  // 如果当前的DOM就是文本节点，则直接更新内容
  if (oldVNode && oldVNode.type === "TEXT") {
    if (oldVNode.props.nodeValue !== newVNode.props.nodeValue) {
      oldVNode.elm.textContent = newVNode.props.nodeValue;
    }
  } else {
    // 如果DOM不是文本节点，则新建一个文本节点DOM，并移除掉原来的
    oldVNode.elm = document.createTextNode(newVNode.props.nodeValue);
    if (oldVNode.elm && oldVNode.elm.parentNode) {
      oldVNode.elm.parentNode.replaceChild(out, oldVNode.elm);
    }
  }
  return oldVNode;
};

const diffType = (oldVNode, newVNode) => {
  let dom = document.createElement(newVNode.type);
  if (oldVNode.elm) {
    if (oldVNode.elm.parentNode) {
      oldVNode.elm.parentNode.replaceChild(dom, oldVNode.elm);
    }
    return render(newVNode, dom);
  }
};

const diffAttributes = (oldVNode, newVNode) => {
  const oldProps = oldVNode.props;
  const newProps = newVNode.props;
  const diffProps = {};

  // 如果原来的属性不在新的属性当中，则将其移除掉（属性值设为undefined）
  for (let name in oldProps) {
    if (!(name in newProps)) {
      diffProps[name] = undefined;
    }
  }

  // 更新新的属性值
  for (let name in newProps) {
    if (oldProps[name] !== newProps[name]) {
      diffProps[name] = newProps[name];
    }
  }

  setAttribute(oldVNode.type, diffProps, oldVNode.eml);
};

const diffChildrens = (oldVNode, newVNode) => {};

const diffComponent = (oldVNode, newVNode) => {};

// 基础对比
const diffNode = (oldVNode, newVNode) => {
  // 对比文本
  if (newVNode.type === "TEXT") {
    return diffText(oldVNode, newVNode);
  }

  // 对比type
  if (oldVNode.type !== newVNode.type) {
    return diffType(oldVNode, newVNode);
  }

  // 对比属性
  diffAttributes(oldVNode, newVNode);

  // 对比组件
  diffComponent(oldVNode, newVNode);

  // 对比childrens
  diffChildrens(oldVNode, newVNode);
};

/**
 * diff策略
 * 1、通过 updateDepth 对vnode进行层次控制
 * 2、分层对比相同层级同一节点，如节点不存在则其被删除不进行子节点对比
 * 3、vnode树只进行一个递归层次遍历即可完成对比
 *
 * @param {newVNode} vnode 新虚拟dom
 * @param {oldVNode} vnode 旧虚拟dom
 * @returns {newVNode} 添加elm真实dom指针
 *
 */
const diff = (oldVNode, newVNode, container) => {
  const vnode = diffNode(oldVNode, newVNode);

  // 判断节点是否为root子节点
  if (vnode.elm && vnode.elm.parentNode !== container) {
    // 装载新建子节点
    container.appendChild(vnode.elm);
  }

  return vnode;
};

export default diff;
