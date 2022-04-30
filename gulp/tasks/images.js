import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import lazypipe from "lazypipe";

export const images = () => {
  const devTasks = app.plugins
    .lazypipe()
    // webp
    .pipe(app.plugins.newer, app.path.build.images)
    .pipe(webp)
    .pipe(app.gulp.dest, app.path.build.images)
    // imagemin
    .pipe(app.gulp.src, app.path.src.images)
    .pipe(app.plugins.newer, app.path.build.images)
    .pipe(imagemin, {
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interplaced: true,
      optimizationLevel: 3, // 0..7
    });

  return (
    app.gulp
      .src(app.path.src.images)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError((error) => ({
            title: "IMAGES",
            message: `Error: ${error.message}`,
          }))
        )
      )
      // if not in development
      .pipe(app.plugins.if(!app.development, devTasks()))
      .pipe(app.gulp.dest(app.path.build.images))
      // svg
      .pipe(app.gulp.src(app.path.src.images))
      .pipe(app.gulp.dest(app.path.build.images))
      // favicon
      .pipe(app.gulp.src(`${app.path.srcFolder}/*.ico`))
      .pipe(app.gulp.dest(app.path.build.images))

      .pipe(app.plugins.browserSync.stream())
  );
};

export const svgImages = () =>
  app.gulp
    .src(app.path.src.svg)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError((error) => ({
          title: "SVG",
          message: `Error: ${error.message}`,
        }))
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browserSync.stream());
