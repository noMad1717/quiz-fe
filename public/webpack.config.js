const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: { loader: 'awesome-typescript-loader' }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: { extensions: ["*", ".ts", ".tsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.ts"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};