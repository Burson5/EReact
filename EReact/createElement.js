const TEXT_ELEMENT = "TEXT";

const createTextElement = value =>
  __createElement(TEXT_ELEMENT, { nodeValue: value });

const __createElement = (type, _props, ...children) => {
  // 浅拷贝
  const props = Object.assign({}, _props);
  const data = { hook: {} };

  // 将props.children 与children 合并
  const hasChildren = children.length > 0;
  const mergeChildren = hasChildren ? [].concat(...children) : [];

  const childrens = mergeChildren
    .filter(c => c !== null && c !== false)
    .map(c => (c instanceof Object ? c : createTextElement(c)));

  // console.log({ type, props, childrens, data });
  return { type, props, childrens, data };
};

export default __createElement;
