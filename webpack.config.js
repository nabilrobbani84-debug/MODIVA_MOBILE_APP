// webpack.config.js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // Tambahkan ini untuk DefinePlugin

const appDirectory = path.resolve(__dirname);

// Daftar library native yang perlu dikompilasi ulang oleh Babel agar bisa jalan di web
const compileNodeModules = [
  'react-native-vector-icons',
  'react-native-safe-area-context',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-screens',
  'react-native-date-picker',
  'react-native-chart-kit',
  'react-native-svg',
  'react-native-image-picker',
  'react-native-keychain', 
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

module.exports = {
  entry: {
    app: path.join(appDirectory, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'bundle.web.js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      // MOCKING: Alias keychain ke react-native-web atau object kosong agar tidak crash di web
      'react-native-keychain': 'react-native-web', 
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(appDirectory, 'index.web.js'),
          path.resolve(appDirectory, 'src'),
          path.resolve(appDirectory, 'App.tsx'),
          ...compileNodeModules,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            // GANTI: Gunakan preset baru di sini juga
            presets: [
              'module:@react-native/babel-preset', 
            ],
            plugins: [
              'react-native-web',
            ],
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            esModule: false,
          },
        },
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(appDirectory, 'public/index.html'),
    }),
    // Tambahkan ini untuk mendefinisikan __DEV__ di web agar tidak error
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    }),
  ],
  devServer: {
    hot: true,
    port: 8081, // Sesuaikan port agar tidak bentrok (default React Native packager 8081)
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};