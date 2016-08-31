const webpack = require('webpack')

module.exports = {
  entry: e([
    'jquery',
    'react',
    ['angular', 'ts'],
    'riot'
  ]),
  output: {
    path: __dirname,
    filename: '[name]/__build__.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tag']
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css', exclude: /angular/ },
      { test: /\.(html|css)$/, loader: 'raw', include: /angular/ },
      { test: /\.ts$/, loader: 'awesome-typescript!angular2-template', include: /angular/ },
      { test: /\.tag$/, loader: 'babel!riotjs', include: /riot/ },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  devtool: 'source-map'
}

function e (names) {
  const entries = {}
  names.forEach(name => {
    if (!Array.isArray(name)) {
      name = [name, 'js']
    }
    entries[name[0]] = [
      './shared.css',
      `./${name[0]}/main.${name[1]}`
    ]
  })
  return entries
}
