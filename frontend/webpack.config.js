const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader'}, //Ler o css e injetar dentro do HTML
          { loader: 'css-loader'}, //Ler o css, interpretar as importações
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i, //Leitura de arquivos gif, png e jpe ou jpeg o i no final transforma case insensitive maius min
        use: {
          loader: 'file-loader',
        }
      }
    ]
  },
};