const fs = require("fs");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

// constants
const srcPath = path.resolve(__dirname, "src") + "/";
const distPath = path.resolve(__dirname, "dist") + "/";
const isProduction = process.env.NODE_ENV === "production";

// remove dist folder
fs.rm(distPath, { recursive: true, force: true }, (err) => {
  console.error(err);
});

module.exports = {
  entry: srcPath + "index.js",
  output: {
    filename: "index.min.js",
    path: distPath,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "icons", to: "icons" },
        { from: "manifest.json", to: "manifest.json" },
        { from: srcPath + "index.html", to: "index.html" },
      ],
    }),
  ],
};
