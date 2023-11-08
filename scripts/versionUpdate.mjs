#!/usr/bin/env zx

import { readManifest, upgradeVersion, useGitTag, writeManifest } from './utils.mjs';
/**
 * 换应用名
 * 换版本号
 * 换版本名
 * 换 icon 图标
 */
const fileContentParsed = await readManifest();
console.log('当前版本', fileContentParsed.versionName);
console.log('当前应用', fileContentParsed.name);
fileContentParsed.versionName = upgradeVersion(fileContentParsed.versionName);
fileContentParsed.versionCode = fileContentParsed.versionCode + 1;
writeManifest(fileContentParsed);
console.log('升级后版本', fileContentParsed.versionName);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// let isMakeTag, isPushTag;
// await askQuestion('是否打 git tag？(Y/N)', (result) => {
//   isMakeTag = result;
// });
// await askQuestion('是否直接推送 tag 到远程分支？(Y/N)', (result) => {
//   isPushTag = result;
// });
// await useGitTag(fileContentParsed.versionName, { isMakeTag, isPushTag });
closeReadline();

function askQuestion(content, callback) {
  return new Promise((resolve, reject) => {
    rl.question(content, (answer) => {
      if (answer.toUpperCase() === 'Y' || answer === '') {
        callback(true);
      } else {
        callback(false);
      }
      resolve();
    });
  });
}

function closeReadline() {
  if (rl) {
    rl.close();
  }
}
