// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

console.log('>>> [metro] metro.config.js carregado (reactCompiler: OFF)');

const config = getDefaultConfig(__dirname);

// garante que não liga o React Compiler
config.transformer = {
  ...config.transformer,
  reactCompiler: false,
};

module.exports = config;
