module.exports = (config) => {
  config.module.rules.push({
    test: /\.(glsl|vs|fs)$/,
    loader: 'ts-shader-loader'
  })
  return config
}
