const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');

exports.webpack = config => Object.assign(config, {
  target: 'electron-renderer'
})

exports.exportPathMap = () => ({
  '/start': { page: '/start' }
})

module.exports = withSASS(withCSS());
