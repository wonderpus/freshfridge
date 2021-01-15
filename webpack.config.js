const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js', 
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',      // what does this setting do?
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.jsx?$/, 
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
            },
            {
              test: /\.js$/,
              enforce: 'pre',
              use: ['source-map-loader']
            },
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] 
            }
        ]
    },
    mode: process.env.NODE_ENV,
    plugins: [
        new HtmlWebpackPlugin({  //what does this do?
            template: './index.html'
        })
    ],
    devServer: {
        host: 'localhost',
        port: 8000,
        // match the output path
        contentBase: './', 
        // enable HMR on the devServer
        hot: true,
        // match the output 'publicPath'
        publicPath: '/dist/',
        // fallback to root for other urls
        historyApiFallback: true,
        inline: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        /**
         * proxy is required in order to make api calls to
         * express server while using hot-reload webpack server
         * routes api fetch requests from localhost:8080/api/* (webpack dev server)
         * to localhost:3000/api/* (where our Express server is running)
         */
        proxy: {
          '/api': {
            target: 'http://localhost:3000/',
            secure: false,
          }
        //   '/assets/**': {
        //     target: 'http://localhost:3000/',
        //     secure: false,
        //   },
        },
      },
}