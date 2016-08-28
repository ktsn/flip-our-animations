module.exports = {
  entry: e([
    'jquery',
    'react',
    ['angular', 'ts']
  ]),
  output: {
    path: __dirname,
    filename: '[name]/__build__.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css', exclude: /angular/ },
      { test: /\.(html|css)$/, loader: 'raw', include: /angular/ },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.ts$/, loader: 'awesome-typescript!angular2-template' }
    ]
  },
  devtool: 'source-map'
}

function e (names) {
  const entries = {}
  names.forEach(name => {
    if (!Array.isArray(name)) {
      name = [name, 'js']
    }
    entries[name[0]] = [
      'todomvc-app-css/index.css',
      './shared.css',
      'core-js/client/shim',
      'zone.js',
      'whatwg-fetch',
      `./${name[0]}/main.${name[1]}`
    ]
  })
  return entries
}
