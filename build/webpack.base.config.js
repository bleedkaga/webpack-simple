const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAseetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const os = require('os')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
    entry: './src/index.js',
    // outout: './dist',
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.join(__dirname, '../dist/'),
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        open: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:9090'
            }
        },
    },
    module: {
        rules: [{
            test: /\.(s?css|less)$/,
            // use: ['style-loader', 'css-loader']
            use: [
                MiniCssExtractPlugin.loader,
                // {
                //     loader: 'style-loader',
                //     options: {
                //         injectType: 'singletonStyleTag', // 将所有style标签合并成一个
                //     }
                // },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'less-loader'
                },
            ]
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: "[name]_[hash:4].[ext]",
                    outputPath: 'images/',
                    limit: 2048
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    edge: '17',
                                    firefox: '60',
                                    chrome: '67',
                                    safari: '11.1'
                                },
                                corejs: 2,
                                useBuiltIns: 'entry'
                            }
                        ]
                    ],
                }
            }
        }]
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader?cacheDirectory'],
            threadPool: happyThreadPool
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:6].min.css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAseetsWebpackPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        }),
        new HtmlWebpackPlugin({
            title: '这是一个沙雕',
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            // 压缩HTML
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     minifyCSS: true,
            //     minifyJS: true
            // }
        }),
    ]
}