const path = require("path");
const DLLNameString = "dll_[name]";

module.exports = {
  mode: "production",
  entry: {
    EReact: "./EReact/index.js",
    "EReactDom": "./EReact-dom/index.js"
  },
  output: {
    library: DLLNameString,
    path: path.resolve(__dirname, "./dlls"),
    filename: "[name].dll.js"
  }
};
