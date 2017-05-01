require('babel-register');
var mainWebpackConfig = require('../config/webpack.config.js');
const project = require('../config/project.config')

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;


module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.loaders = mainWebpackConfig.module.loaders;
  storybookBaseConfig.resolve = {
    root       : project.paths.client(),
    extensions : ['', '.js', '.jsx', '.json']
  };
  return storybookBaseConfig;
};
