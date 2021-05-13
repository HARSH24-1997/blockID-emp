const withPlugins = require("next-compose-plugins");

const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const webpack = require("webpack");
const path = require("path");

module.exports = withPlugins([withFonts(
    withCSS(
        withImages(
            withSass({
              webpack(config, options) {
                config.module.rules.push({
                  test: /\.(eot|ttf|woff|woff2)$/,
                  use: {
                    loader: "url-loader",
                  },
                });
                config.resolve.modules.push(path.resolve("./"));
                return config;
              },
            })
        )
    )
),
  {
    async rewrites() {
      return [
        {
          source: '/api/login',
          destination: 'https://d1tcagz71y2olz.cloudfront.net/api/login',
        },
        {
          source: '/api/user',
          destination: 'https://d1tcagz71y2olz.cloudfront.net/api/user',
        },
      ]
    }
  }
]);
