const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(env) {
    const config = {
        entry: './examples/triangle/simple.ts',
        devtool: env.production ? 'source-maps' : 'eval',
        mode: env.production ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [ '.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
            open: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './examples/triangle/simple1.html'
            })
        ]
    }

    return config;
};