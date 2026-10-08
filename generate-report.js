const { execSync } = require("child_process");

execSync(
  "npx mchr --jsonDir ./reports --reportPath ./reports/html",
  { stdio: "inherit" }
);