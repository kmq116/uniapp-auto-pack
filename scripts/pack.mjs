#!/usr/bin/env zx
import iconv from 'iconv-lite';
const encoding = 'cp936';
import { readManifest } from './utils.mjs';
const regHttp = /(https:.*)（/gm;

async function startPack() {
    const configPath = process.cwd() + '\\build-config.json';
    const packEnv = process.argv[3];

    // 配置项目路径文件
    const p = $`cli.exe pack --config ${configPath}`;
    for await (const chunk of p.stdout) {
        // 格式化为中文进行输出
        const formatStdout = iconv.decode(Buffer.from(chunk, 'gbk'), encoding);
        console.log(formatStdout);
        if (formatStdout.includes('配置文件') && formatStdout.includes('不存在')) {
            console.log(
                '用于 hbuilderx 打包的 json 文件不存在，请全局搜索 `cli.exe pack --config` 并将其后面的参数配置为正确 json 文件',
            );
            exit();
        }

        if (formatStdout.includes('证书文件不存在')) {
            // chalk.blue('证书文件不存在，请检查证书文件是否存在')
            console.log(
                '证书文件不存在，请在配置文件 build-config.json 修改  certfile 字段为 xxxxx.keystore 的路径',
            );
            exit();
        }
        // 正则表达式执行结果
        const regResult = regHttp.exec(formatStdout);
        if (regResult) {
            // 匹配到 hbuilderx 返回的url地址可以打开
            const url = regResult[1];
            if (url.includes('https://')) {
                const projectConfig = await readManifest();
                open(url)
            }
        }
    }
}

try {
    await $`cli.exe open`;
} catch (e) {
    console.log(e, '调用 cli 命令行工具出错，可能没有配置成功 hbuilderx 路径');
    exit();
}
await startPack();

function exit() {
    process.exit();
}
