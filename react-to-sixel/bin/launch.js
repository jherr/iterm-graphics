#!/usr/bin/env node
const { exec } = require("child_process");
exec(`node ${__dirname}/../dist/index.js | imgcat`, (err, stdout, stderr) => {
  console.log(stdout);
});
