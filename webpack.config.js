const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // ここから修正 ( .js to .ts ) --->
    entry: './index.ts',
    // <--- ここまで修正 ( .js to .ts )
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    // devServer: {
    //     contentBase: path.resolve(__dirname, 'public')
    // },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            // ここから追加 --->
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }]
            },
            // <--- ここまで修正
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        // ここから修正 ( .ts を追加 ) --->
        extensions: ['.js', '.ts', '.vue', '.json'],
        // <--- ここまで修正 ( .ts を追加 )
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        // new CopyPlugin([{ from: './public' }])
    ]
}

