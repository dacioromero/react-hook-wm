import ts from '@wessberg/rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

import packageJson from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'es',
      sourcemap: true,
    },
    {
      file: packageJson.unpkg,
      format: 'umd',
      name: 'ReactHookWM',
      plugins: [terser()],
      sourcemap: true,
      globals: {
        react: 'React',
      },
    }
  ],
  plugins: [ts(), peerDepsExternal({ includeDependencies: true })]
}
