const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildStart:[
                'node ./scripts/create-logos-scss.js',
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Logo Motions',
            template: './public/index.html',
            hash: true,
        }),
        new MiniCssExtractPlugin({}),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/assets/logos'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/assets/spritesmith-generated/sprite.png'),
                css: path.resolve(__dirname, 'src/assets/spritesmith-generated/sprite.sass')
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            },
            spritesmithOptions: {
                padding: 20
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|build|dist)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.s?css$/, use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.png$/, use: [
                    'file-loader?name=i/[hash].[ext]'
                ]
            }
        ]
    },
    resolve: {
        modules: ["node_modules", "spritesmith-generated"]
    },
}
;
