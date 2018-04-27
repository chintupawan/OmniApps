var config = require("./webpack.dev.config");
var webpack = require('webpack');
const path = require('path');

config.plugins = [];
config.plugins.push(
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "API_URL": JSON.stringify("http://prod/omninotes/api")
        }
    }),
);
module.exports = config;