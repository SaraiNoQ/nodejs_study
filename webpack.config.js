let path = require('path');
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    mode: "production",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 5000,
        open: true
    }
};