const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: "production",
  devtool: "source-map",
  context: path.resolve(__dirname, "src"),
  entry: "./web.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      fs: "memfs",
    },
  },
  output: {
    filename: "core.js",
    path: path.resolve(__dirname, "docs/.vuepress/public/assets/js/@caporal"),
    library: "@caporal/core",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  node: {
    path: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.version": JSON.stringify(process.version),
    }),
    new webpack.NormalModuleReplacementPlugin(
      /src\/autocomplete\/index\.ts/,
      path.resolve(__dirname, "src/utils/web/autocomplete.ts"),
    ),
    new webpack.ProvidePlugin({
      process: path.resolve(__dirname, "src/utils/web/process"),
    }),
  ],
}
