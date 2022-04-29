import webpack from "webpack-stream";

export const js = () => {
  const webpackConfig = {
    mode: app.development ? "development" : "production",
    output: {
      filename: "app.min.js",
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };

  return app.gulp
    .src(app.path.src.js, { sourcemaps: true }) //!app.development
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError((error) => ({
          title: "JS",
          message: `Error: ${error.message}`,
        }))
      )
    )

    .pipe(webpack(webpackConfig))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
};
