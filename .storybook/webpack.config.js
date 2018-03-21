const merge = require('lodash/merge');
const path = require('path');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');

module.exports = (config, env) => {
  const newConfig = wixStorybookConfig(genDefaultConfig(config, env));

  return merge(newConfig, {
    context: path.resolve(__dirname, '../src'),
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    resolve: {
      alias: {
        'wix-style-react': path.resolve(__dirname, '../src'),
        story: path.resolve(__dirname, '../stories/create-story')
      },
    },
    module: {
      rules: newConfig.module.rules.concat({
        test: /\.story\.js$/,
        loader: 'wix-storybook-utils/loader',
        options: {
          storyConfig: {
            moduleName: 'wix-style-react',
            repoBaseURL: 'https://github.com/wix/wix-style-react/tree/master/src/',
          }
        }
      })
    }
  });
};
