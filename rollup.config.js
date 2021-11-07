import { babel } from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss'
import path from 'path'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: 'src/js/index.js',
    output: {
      dir: 'dist',
      format: 'iife',
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude:'node_modules/**',
        babelHelpers: 'bundled'
      }),
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        preventAssignment: true
      }),
      postcss({
            inject: false,
            extract: true,
            sourceMap: (process.env.NODE_ENV === 'production' ? false : 'inline'),
            minimize: (process.env.NODE_ENV === 'production')
        })
    ],
    watch: {
      include: ["src/**/*.js", "src/**/*.scss"]
    }
  },
];
