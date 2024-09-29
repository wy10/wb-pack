class HookCodeFactiory {
  constructor() {
    this._args = undefined;
    this.options = undefined;
  }
  setup(instance, options) {
    instance._x = options.taps.map((item) => item.fn);
  }
  create(options) {
    let fn;
    this.init(options);
    switch (options.type) {
      case "sync":
        fn = new Function(
          this.args(),
          "'use strict';\n" + this.header() + this.contentWithInerceptors()
        );
        break;

      default:
        break;
    }
    this.deinit(options);
    return fn;
  }
  init(options) {
    this.options = options;
    this._args = options._args.slice();
  }
  deinit() {
    this.options = undefined;
    this._args = undefined;
  }
  args() {
    let allArgs = this._args;
    return allArgs.join(",");
  }
  header() {
    let code = "";
    code += "var _context;\n";
    code += "var _x = this._x;\n";
    return code;
  }
  contentWithInerceptors() {
    return this.callTapsSeries();
  }
  callTapsSeries() {
    let code = "";
    for (let i = this.options.taps.length - 1; i >= 0; i--) {
      let content = this.callTap(i);
      code += content;
    }
    return code;
  }
  callTap(tapIndex) {
    let code = "";
    code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;
    let tap = this.options.taps[tapIndex];
    switch (tap.type) {
      case "sync":
        code += `_fn${tapIndex}(${this.args()});\n`;
    }
    return code;
  }
}

module.exports = HookCodeFactiory;
