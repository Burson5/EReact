const isListener = propName => propName.startsWith("on");
const isAttribute = propName =>
  !isListener(propName) && propName !== "children";

const reconcile = (vdom, el, REFRESH) => {
  const { type, props, data } = vdom;

  const isTextElement = type === "TEXT";
  const dom = isTextElement
    ? document.createTextNode("")
    : document.createElement(type);

  // 事件监听
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  // 添加Attributes
  Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
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
        dom[name] = value;
      }
    });

  // 递归children
  const childElement = props.children || [];
  childElement.forEach(element => reconcile(element, dom));

  // 插入真实DOM
  if (REFRESH) {
    el.parentNode.replaceChild(dom, el);
  } else {
    el.appendChild(dom);
  }
  // 保存真实dom至所对应虚拟dom
  vdom.elm = dom;

  // 生命周期钩子
  data.hook && data.hook.create && data.hook.create();
  data.hook && data.hook.create && data.hook.updated();

  return vdom;
};

export default reconcile;
