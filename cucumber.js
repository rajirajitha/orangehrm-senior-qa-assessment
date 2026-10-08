module.exports = {
  default: {
    require: [
      "src/support/**/*.ts",
      "src/steps/**/*.ts"
    ],
    requireModule: [
      "ts-node/register"
    ],
    format: [
      "progress",
      "json:reports/cucumber-report.json"
    ],
    formatOptions: {
      snippetInterface: "async-await"
    },
    publishQuiet: true
  }
};