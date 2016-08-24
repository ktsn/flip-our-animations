module.exports = {
  entry: e(['jquery', 'react']),
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

function e (names) {
  const entries = {}
  names.forEach(name => {
    entries[name] = ['todomvc-app-css/index.css', './shared.css', 'whatwg-fetch', `./${name}/main.js`]
  })
  return entries
}
