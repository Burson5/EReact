const TEXT_ELEMENT = "TEXT";

const createTextElement = value =>
  $createElement(TEXT_ELEMENT, { nodeValue: value });

const $createElement = (type, _props, ...children) => {
  // 浅拷贝
  const props = Object.assign({}, _props);
  const data = { hook: {} };

  // 将props.children 与children 合并
  const hasChildren = children.length > 0;
  const mergeChildren = hasChildren ? [].concat(...children) : [];

  props.children = mergeChildren
    .filter(c => c !== null && c !== false)
    .map(c => (c instanceof Object ? c : createTextElement(c)));

  return { type, props, data };
};

export default $createElement;
