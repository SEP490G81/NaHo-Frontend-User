import fs from "fs";

const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, "utf8").trim();

const pattern =
  /^#\d+ - (feature|fix|hotfix|refactor|docs|test|chore|style|perf|ci): .+$/;

if (!pattern.test(commitMsg)) {
  console.error(`
Invalid commit message.

Expected format:
  #[number] - [label]: message

Examples:
  #1 - feature: login
  #23 - fix: validate email
  #10 - refactor: auth service

Allowed labels:
  feature, fix, hotfix, refactor, docs, test, chore, style, perf, ci
`);

  process.exit(1);
}