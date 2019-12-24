const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js',
        publicPath: "/assets/",
    },
    module: {
        rules: [{
            test: /\m?.js$/,
            include: [
                path.resolve(__dirname, 'index.js'),
                path.resolve(__dirname, 'src')
            ],
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-syntax-jsx',
                        ['@babel/plugin-transform-react-jsx', { 'pragma': 'UI.jsx2dom' }],
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }
        }, {
            test: /\.html$/,
            use: ['html-loader']
        }, {
            test: /\.scss$/,
            use: ['css-loader', 'sass-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
}