module.exports = {
  entry: {
  },
  output: {
    path: __dirname,
    filename: '[name]/__build__.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },
  devtool: 'source-map'
}

function e (file) {
  return ['todomvc-app-css/index.css', './shared.css', 'whatwg-fetch', file]
}
