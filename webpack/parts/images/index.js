exports.loadImages = function({ include, exclude, options } = {}) {
  return {
    module: {
      rules: [
        {
          test: /.*\.(gif|png|jpg|jpeg|svg)$/i,
          loaders: [
            'file-loader?name=/public/images/[name].[ext]',
            {
              loader: 'image-webpack-loader',
              query: {
                progressive: true,
                gifsicle: {
                  interlaced: false,
                },
                mozjpeg: {
                  quality: 70,
                  progressive: true,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                svgo: {
                  plugins: [
                    {
                      removeViewBox: false,
                    },
                    {
                      removeEmptyAttrs: true,
                    },
                  ],
                }, 
              },
            },
          ],
        },
      ],
    },
  };
};