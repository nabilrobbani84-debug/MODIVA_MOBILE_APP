const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    // Pastikan Metro mencari di node_modules root
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],

    resolveRequest: (context, moduleName, platform) => {
      if (platform === 'web') {
        // Alias: react-native-linear-gradient -> react-native-web-linear-gradient
        if (moduleName === 'react-native-linear-gradient') {
          return context.resolveRequest(
            context,
            'react-native-web-linear-gradient',
            platform
          );
        }
        
        // Alias: react-native -> react-native-web
        // Ini menggantikan fungsi plugin babel yang kita hapus tadi
        if (moduleName === 'react-native') {
          return context.resolveRequest(
            context,
            'react-native-web',
            platform
          );
        }
      }
      // Biarkan Metro menangani request lainnya secara normal
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);