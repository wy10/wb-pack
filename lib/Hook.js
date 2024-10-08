const CALL_DELEGATE = function (...args) {
  this.call = this._createCall("sync");
  return this.call(...args);
};

class Hook {
  constructor(args, name) {
    this._args = args;
    this.name = name;
    this.taps = [];
    this._x = [];
    this._call = CALL_DELEGATE;
    this.call = CALL_DELEGATE;
    this.compile = this.compile;
  }

  tap(options, fn) {
    this._tap("sync", options, fn);
  }
  _tap(type, options, fn) {
    if (typeof options === "string") {
      options = {
        name: options.trim(),
      };
    }
    options = Object.assign({ fn, type }, options);
    this._insert(options);
  }
  _insert(item) {
    this.taps.push(item);
  }

  compile(options) {
    // 交给子类实现
    throw new Error("抽象方法需要实现");
  }
  _createCall(type) {
    return this.compile({
      type,
      taps: this.taps,
      _args: this._args,
    });
  }
}

module.exports = Hook;
