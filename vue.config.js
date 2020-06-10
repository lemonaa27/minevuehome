'use strict'
const path = require('path')
const defaultSettings = require('./src/setting.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}
const name = defaultSettings.title || '产品授权服务平台' // page title
const port = process.env.port || process.env.npm_config_port || 8081 // dev port
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: `http://127.0.0.1:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        // after: require('./mock/mock-server.js')
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('views',resolve('src/views'))
    },
    transpileDependencies: ['webpack-dev-server/client', 'camelcase'], // 2.20
}