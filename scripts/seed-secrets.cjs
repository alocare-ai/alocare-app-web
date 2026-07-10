#!/usr/bin/env node
const path = require("path");
require(path.join(__dirname, "..", "..", "alocare-tech-stack", "scripts", "alocare-seed-secrets.cjs")).main(
  path.join(__dirname, ".."),
);
