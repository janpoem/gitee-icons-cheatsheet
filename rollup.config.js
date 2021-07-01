import typescript from '@rollup/plugin-typescript';

export default args => {
  return {
    input   : 'src/index.tsx',
    output  : {
      file   : './public/app.js',
      name   : 'App',
      format : 'umd',
      globals: {
        'react'    : 'React',
        'react-dom': 'ReactDOM',
      }
    },
    external: ['react', 'react-dom'],
    plugins : [
      typescript({
        module     : 'ES2015',
        sourceMap  : false,
        declaration: false,
        strict     : !!args.strictMode,
      })
    ]
  };
};
