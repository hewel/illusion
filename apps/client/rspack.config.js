import { defineConfig } from '@rspack/cli'

export default defineConfig({
  entry: {
    main: './src/main.tsx'
  },
  builtins: {
    emotion: true,
    react: {
      importSource: '@emotion/react'
    },
    html: [
      {
        template: './index.html'
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset'
      }
    ]
  },
  devServer: {
    open: true
  }
})
