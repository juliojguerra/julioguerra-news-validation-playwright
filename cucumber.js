let common = [
  "features/*.feature", // Specify our feature files
  "--require-module ts-node/register", // Load TypeScript module
  "--require features/**/steps.ts", // Load step definitions
  "--format progress-bar", // Load custom formatter
  "--publish-quiet",
].join(" ");

module.exports = {
  default: common,
};
