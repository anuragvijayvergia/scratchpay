module.exports = (api) => {
  api.cache(true);
  const presets = ['@babel/preset-env'];
  const plugins = ['istanbul'];
  const babelrcRoots = [
    '.',
    './node_common/*',
  ];
  return {
    presets,
    plugins,
    babelrcRoots,
  };
};
