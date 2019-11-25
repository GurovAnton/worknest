module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
    }),
    require('postcss-nested'),
    require('autoprefixer'),
  ],
};
