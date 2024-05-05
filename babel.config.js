module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    /// This Plugin should be last
    'react-native-reanimated/plugin',
  ],
};
