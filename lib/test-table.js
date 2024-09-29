let { SyncHook } = require("./Tapable");

let hook = new SyncHook(["arg"]);

hook.tap("click1", function (args) {
  console.log(args);
});
hook.tap("click2", function (args) {
  console.log(args);
});
hook.tap("click3", function (args) {
  console.log(args);
});

hook.call("niuniun");
