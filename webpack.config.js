var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: __dirname  + '/dist/',
        filename: './dist/js/bundle.js'
    },
    devtool: 'inline-sorce-map',
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader' },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader?outputStyle=compressed!autoprefixer-loader?browsers=last 2 version'
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      root: [path.join(__dirname, 'bower_components')]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
    ]
};
