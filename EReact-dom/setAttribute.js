const isTextElement = type => type === "TEXT";
const isListener = propName => propName.startsWith("on");
const isAttribute = propName =>
  !isListener(propName) && propName !== "children";

const setAttribute = (type, props, dom) => {
  const propsKeys = Object.keys(props);
  // 事件监听
  propsKeys.filter(isListener).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    const value = props[name];
    if (type === "input" && eventType === "change") {
      if (value) {
        dom.addEventListener("input", e => {
          props[name](e.target.value);
        });
      } else {
        dom.removeEventListener();
      }
    } else {
      dom.addEventListener(eventType, props[name]);
    }
  });

  // 添加Attributes
  propsKeys.filter(isAttribute).forEach(name => {
    // calssName
    const value = props[name];
    if (name === "className") {
      dom.class = value;
    } else if (name === "style") {
      if (!value || typeof value === "string") {
        dom.style.cssText = value || "";
      } else if (value && typeof value === "object") {
        for (let styleName in value) {
          dom.style[styleName] =
            typeof value[styleName] === "number"
              ? `${value[styleName]}px`
              : value[styleName];
        }
      }
    } else {
      if (name in dom) {
        dom[name] = value || "";
      }
      if (!isTextElement(type)) {
        if (value) {
          dom.setAttribute(name, value);
        } else {
          dom.removeAttribute(name, value);
        }
      }
    }
  });
};

export default setAttribute;
