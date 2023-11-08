#!/usr/bin/env zx

import fs from 'fs-extra';
import {readManifest, writeFileSync, writeManifest} from './utils.mjs';
import {pinyin2Name} from "./dic.mjs";

const args = process.argv.slice(2);
const pkgPinyin = args[1];


const configJson = await readManifest();

// 替换版本号
configJson.name = pinyin2Name[pkgPinyin];
console.log(configJson.name);
const splashscreen = configJson['app-plus']?.['distribute']?.['splashscreen'];
// 替换启动图
if (splashscreen) {
    // splashscreen.androidStyle =
    // splashscreen.android.hdpi =
    // splashscreen.android.xhdpi =
    // splashscreen.android.xxhdpi =
}

writeManifest(configJson);

