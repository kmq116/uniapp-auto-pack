#!/usr/bin/env zx

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
import {
    calculateNumber,
    readManifest,
    validateVersionName,
    writeManifest,
} from './utils.mjs';
const manifestFileContent = await readManifest();

let versionName;

await askQuestion('输入版本 例如：0.0.1 ', (content) => {
    versionName = content;
});
rl.close();
if (versionName && validateVersionName(versionName)) {
    manifestFileContent.versionName = versionName;
    manifestFileContent.versionCode = calculateNumber(versionName);
    writeManifest(manifestFileContent);
}

function askQuestion(content, callback) {
    return new Promise((resolve, reject) => {
        rl.question(content, (answer) => {
            callback(answer);
            resolve();
        });
    });
}
