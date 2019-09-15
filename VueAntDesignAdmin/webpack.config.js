var path = require('path');
var webpack = require('webpack');
const bundleOutputDir = './wwwroot/dist';

process.env = {
    NODE_ENV: 'production'
}

module.exports = {
    context: __dirname,
    entry: { main: './ClientApp/index.js' },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    output: {
        path: path.join(__dirname, bundleOutputDir),
        filename: '[name].js',
        publicPath: 'dist/'
    },
    // ÿ��module��ͨ��eval()��ִ�У���������һ��DataUrl��ʽ��SourceMap.
    devtool: '#eval-source-map',
    plugins: [
        // ���û���������Ϣ
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
    // ����һ��SourceMap�ļ�.
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                // ��UglifyJsɾ��û���õ��Ĵ���ʱ���������
                warnings: false,
                // ɾ�����е� `console` ��䣬���Լ���ie�����
                drop_console: true,
                // ��Ƕ�����˵���ֻ�õ�һ�εı���
                collapse_vars: true,
                // ��ȡ�����ֶ�ε���û�ж���ɱ���ȥ���õľ�ֵ̬
                reduce_vars: true
            }, output: {
                // ����յ����
                beautify: false,
                // ɾ�����е�ע��
                comments: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}