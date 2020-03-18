// import typescript from '@rollup/plugin-typescript'
import ts from '@wessberg/rollup-plugin-ts'

import packageJson from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [ts()],
  external: [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {})
  ]
}
