const Hook = require("./Hook.js");
const HookCodeFactiory = require("./HookCodeFactory.js");

class SyncHookCodeFactiory extends HookCodeFactiory {
  content() {
    return this.callTapsSeries();
  }
}

const factory = new SyncHookCodeFactiory();

function COMPILE(options) {
  factory.setup(this, options);
  return factory.create(options);
}

function SyncHook(args = [], name = undefined) {
  // 实例继承 增强
  let hook = new Hook(args, name);
  hook.compile = COMPILE;
  return hook;
}

SyncHook.prototype = null;

module.exports = SyncHook;
