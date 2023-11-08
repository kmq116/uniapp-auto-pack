#!/usr/bin/env zx

import {readManifest} from "./utils.mjs";
import inquirer from 'inquirer';
import {name2Pinyin} from "./dic.mjs";

const mainFileContent = await readManifest();
if (process.platform === 'win32') {
    try {
        await $`Remove-Item Alias:cli -Force -ErrorAction Ignore`;
    } catch (e) {
        console.log(e, 'window 下执行命令错误');
    }
}


console.log(mainFileContent)
const httpEnv = {
    环境a: '正式',
    环境b: '测试',
};
const versionType = {
    手动: '手动输入版本',
    自动: '自动升级版本',
    不变: '保持现有版本',
};

inquirer.prompt([
    {
        type: 'list',
        name: 'pkg',
        message: '请选择要打包的项目：',
        choices: Object.keys(name2Pinyin),
    },
    {
        type: 'list',
        name: 'packEnv',
        message: `请选择打包环境`,
        choices: [httpEnv.环境a, httpEnv.环境b],
    },
    {
        type: 'list',
        name: 'versionType',
        message: `请选择版本更新方式，当前版本 ：${mainFileContent.versionName}`,
        choices: Object.values(versionType),
    },
]).then(async (answers) => {
    const selectedPkg = answers.pkg;
    console.log(selectedPkg)
    const scriptParams = name2Pinyin[selectedPkg];

    await $`npm run prebuild:${scriptParams}`;
    if (answers.versionType === versionType.手动) {
        await $`npm run vchange`;
    }
    if (answers.versionType === versionType.自动) {
        await $`npm run vupdate`;
    }
})