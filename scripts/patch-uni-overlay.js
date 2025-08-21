// scripts/patch-uni-overlay.js
const fs = require('fs');
const path = require('path');

function patchServe(file) {
    if (!fs.existsSync(file)) return false;
    let s = fs.readFileSync(file, 'utf8');

    // 如果已经打过补丁就跳过
    if (s.includes('normalizeDevServerOptions') || /client:\s*{[^}]*overlay/.test(s)) {
        console.log('[patch] seems already patched:', file);
        return true;
    }

    // 1) 在 webpack5 分支（new WebpackDevServer(Object.assign({...}), compiler)）里：
    //   - 删除顶层 overlay
    //   - 注入 client.overlay 默认值
    s = s.replace(
        /new WebpackDevServer\(\s*Object\.assign\(\s*{\s*([\s\S]*?)client:\s*{\s*([\s\S]*?)progress:\s*!process\.env\.VUE_CLI_TEST,\s*([\s\S]*?)\}\s*,/m,
        (m, a, clientBlock, cTail) => {
            // 确保 overlay 存在
            if (!/overlay\s*:/.test(clientBlock)) {
                clientBlock =
                    `logging: 'none',\n` +
                    `          overlay: process.env.NODE_ENV === 'production' ? false : { warnings: false, errors: true },\n` +
                    clientBlock.replace(/logging:\s*'none',?/, '');
            }
            return `new WebpackDevServer(Object.assign({\n${a}client: {\n${clientBlock}progress: !process.env.VUE_CLI_TEST,\n${cTail}},`;
        }
    );

    // 2) 删除任何顶层 overlay: ...（宽松匹配）
    s = s.replace(/(\s*)overlay\s*:\s*(true|false|{[\s\S]*?})\s*,?/g, '');

    // 3) 兜底：如果用户配置 devServer.overlay，迁移到 devServer.client.overlay
    if (!s.includes('// migrate overlay if present')) {
        s = s.replace(
            /(server = new WebpackDevServer\([\s\S]*?Object\.assign\([\s\S]*?),(?:\s*projectDevServerOptions|\s*normalizedDevServerOptions)\s*,\s*{\s*https:\s*useHttps,)/m,
            (m, head, tail) =>
                `${head}, ${tail.replace(
                    '{ https: useHttps,',
                    `{
        https: useHttps,
        // migrate overlay if present on merged options
        setupMiddlewares (middlewares, devServer) {
          const opts = devServer.options || {};
          if ('overlay' in opts) {
            const ov = opts.overlay;
            opts.client = Object.assign({ overlay: ov === true ? { errors: true, warnings: false } : ov }, opts.client || {});
            delete opts.overlay;
          }`
                )}`
        );
        // 把我们插入的 setupMiddlewares 末尾补全 return middlewares
        s = s.replace(
            /api\.service\.devServerConfigFns\.forEach[\s\S]*?if \((?:projectDevServerOptions|normalizedDevServerOptions)\.setupMiddlewares\)[\s\S]*?return (?:projectDevServerOptions|normalizedDevServerOptions)\.setupMiddlewares\(middlewares, devServer\)\s*\}[\s\S]*?return middlewares\s*\}\s*\}\s*\), compiler\)/m,
            (m) => m // 已存在就不重复
        );
    }

    fs.writeFileSync(file, s, 'utf8');
    console.log('[patch] overlay → client.overlay applied:', file);
    return true;
}

const target = path.join(
    __dirname,
    '..',
    'node_modules',
    '@dcloudio',
    'vue-cli-plugin-uni',
    'commands',
    'serve.js'
);

if (!patchServe(target)) {
    console.warn('[patch] target not found:', target);
    process.exitCode = 0;
}
