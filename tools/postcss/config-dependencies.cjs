const path = require("node:path");

module.exports = ({ files = [] } = {}) => ({
  postcssPlugin: "config-dependencies",
  Once(_, { result }) {
    for (const file of files) {
      result.messages.push({
        type: "dependency",
        plugin: "config-dependencies",
        file: path.resolve(file),
        parent: result.opts.from,
      });
    }
  },
});

module.exports.postcss = true;
