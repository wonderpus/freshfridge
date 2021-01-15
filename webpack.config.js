var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['index.js'], 
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.(js)$/, 
                use: 'babel-loader' 
            },
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] 
            }
        ]
    },
    mode: 'development',
    plugins: [

        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}