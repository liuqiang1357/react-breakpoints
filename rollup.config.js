import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const input = './src/index.ts';
const external = ['react'];

export default [
  // CommonJS (for Node)
  {
    input,
    external,
    plugins: [resolve(), commonjs(), typescript()],
    output: { dir: path.dirname(pkg.main), format: 'cjs', sourcemap: true },
  },
  // ES module (for bundlers) build.
  {
    input,
    external,
    plugins: [resolve(), commonjs(), typescript()],
    output: { dir: path.dirname(pkg.module), format: 'es', sourcemap: true },
  },
  // browser-friendly UMD build
  {
    input,
    external,
    plugins: [resolve(), commonjs(), typescript()],
    output: {
      name: 'reactBreakpoints',
      dir: path.dirname(pkg.unpkg),
      format: 'umd',
      sourcemap: true,
    },
  },
];
