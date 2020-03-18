import ts from '@wessberg/rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

function withMinified(options) {
  const file = options.file.replace(/.js$/, '.min.js')
  const plugins = [...(options.plugins || []), terser()]

  return [
    options,
    {
      ...options,
      file,
      plugins
    }
  ]
}

export default {
  input: 'src/index.ts',
  output: [
    ...withMinified({
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    }),
    ...withMinified({
      file: packageJson.module,
      format: 'es',
      sourcemap: true
    }),
    ...withMinified({
      file: packageJson.unpkg,
      format: 'umd',
      name: 'ReactHookWM',
      globals: {
        react: 'React'
      }
    })
  ],
  plugins: [ts()],
  external: [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {})
  ]
}
