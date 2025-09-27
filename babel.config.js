// babel.config.js
module.exports = function (api) {
    api.cache(true);
    console.log('>>> [babel] babel.config.js carregado (compiler: OFF)');
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        "react-native-reanimated/plugin",
      ],
    };
  };
  