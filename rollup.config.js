const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').default;
const typescript = require('@rollup/plugin-typescript');
const { terser } = require('rollup-plugin-terser');

module.exports = {
    input: './lib/index.ts',
    output: {
        dir: './build/dist',
        format: 'commonjs',
    },
    external: ['react'],
    plugins: [
        resolve(),
        typescript(),
        terser({
            compress: true,
            ecma: '2016',
        }),
        commonjs({ extensions: ['.ts', '.js'] }),
    ],
};
