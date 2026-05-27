const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watchFolders = [path.resolve(__dirname)];

config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [path.resolve(__dirname, "node_modules")],
};

module.exports = withNativewind(config);
