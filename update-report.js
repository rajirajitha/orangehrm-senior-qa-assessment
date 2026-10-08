const fs = require("fs");

const reportPath = "./reports/html/index.html";

const oldName = "Parvathaneni Sunitha";
const newName = "Rajitha Chandrasekhar";

let html = fs.readFileSync(reportPath, "utf8");

html = html.replaceAll(oldName, newName);

fs.writeFileSync(reportPath, html, "utf8");

console.log(`Report username updated to: ${newName}`);