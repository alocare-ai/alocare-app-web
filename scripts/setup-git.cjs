#!/usr/bin/env node

const { execSync } = require("node:child_process");
const readline = require("node:readline");

function runGit(args) {
  return execSync(`git ${args.join(" ")}`, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  }).trim();
}

function isGitRepo() {
  try {
    runGit(["rev-parse", "--is-inside-work-tree"]);
    return true;
  } catch {
    return false;
  }
}

function getGitConfig(scope, key) {
  try {
    return runGit(["config", `--${scope}`, "--get", key]);
  } catch {
    return "";
  }
}

function getLocalGitConfig(key) {
  return getGitConfig("local", key);
}

function getGlobalGitConfig(key) {
  return getGitConfig("global", key);
}

function setLocalGitConfig(key, value) {
  runGit(["config", "--local", key, JSON.stringify(value)]);
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function askRequired(label, hint) {
  const suffix = hint ? ` [${hint}]` : "";
  while (true) {
    const value = await ask(`${label}${suffix}: `);
    if (value) {
      return value;
    }
    console.log(`${label} is required.`);
  }
}

async function promptForIdentity({ nameHint, emailHint }) {
  console.log("\nGit identity is not configured for this repository.");
  console.log("Set the author used for commits in alocare-app-web.\n");

  const name = await askRequired("Git user.name", nameHint);
  const email = await askRequired("Git user.email", emailHint);

  return { name, email };
}

async function main() {
  if (process.env.VERCEL || process.env.CI) {
    return;
  }

  if (!isGitRepo()) {
    console.log("[setup-git] Skipped: not a git repository.");
    return;
  }

  let name = getLocalGitConfig("user.name");
  let email = getLocalGitConfig("user.email");

  const missingName = !name;
  const missingEmail = !email;

  if (!missingName && !missingEmail) {
    console.log(`[setup-git] Git identity already set: ${name} <${email}>`);
    return;
  }

  const globalName = getGlobalGitConfig("user.name");
  const globalEmail = getGlobalGitConfig("user.email");

  if (!process.stdin.isTTY) {
    if (missingName && globalName) {
      setLocalGitConfig("user.name", globalName);
      name = globalName;
    }
    if (missingEmail && globalEmail) {
      setLocalGitConfig("user.email", globalEmail);
      email = globalEmail;
    }

    const stillMissingName = missingName && !name;
    const stillMissingEmail = missingEmail && !email;

    if (!stillMissingName && !stillMissingEmail) {
      console.log(`[setup-git] Configured from global git config: ${name} <${email}>`);
      return;
    }

    console.log(
      "[setup-git] Skipped: git identity is not configured and this session is not interactive.",
    );
    console.log("[setup-git] Run `npm run setup-git` to set user.name and user.email.");
    return;
  }

  const identity = await promptForIdentity({
    nameHint: missingName ? globalName : undefined,
    emailHint: missingEmail ? globalEmail : undefined,
  });

  name = missingName ? identity.name : name;
  email = missingEmail ? identity.email : email;

  if (missingName) {
    setLocalGitConfig("user.name", name);
  }

  if (missingEmail) {
    setLocalGitConfig("user.email", email);
  }

  console.log(`[setup-git] Configured git identity: ${name} <${email}>`);
}

main().catch((error) => {
  console.error("[setup-git] Failed:", error.message);
  process.exit(1);
});
