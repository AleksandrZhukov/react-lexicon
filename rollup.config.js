import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

const baseOutput = {
  name: 'react-lexicon',
  exports: 'named',
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  }
};

export default {
  input: 'src/index.js',
  output: [
    Object.assign({}, baseOutput, {
      file: `build/react-lexicon.es.js`,
      format: 'es'
    }),
    Object.assign({}, baseOutput, {
      file: `build/react-lexicon.cjs.js`,
      format: 'cjs'
    })
  ],
  external: ['react', 'prop-types'],
  plugins: [
    resolve({ jsnext: true, main: true }),
    commonjs({ include: 'node_modules/**' }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['env', { modules: false }], 'stage-0', 'react'],
      plugins: ['external-helpers']
    })
  ]
}
