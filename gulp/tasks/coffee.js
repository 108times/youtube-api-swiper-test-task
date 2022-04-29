import coffee from "gulp-coffee";
import concat from "gulp-concat";
import path from "path";
import debug from "gulp-debug";

export function coffeePipe(done = () => {}) {
  const paths = {
    coffee: `node_modules/gapi/lib/*.coffee`,
  };
  console.log(paths);

  app.gulp
    .src(paths.coffee)
    .pipe(debug({ title: "coffee 2" }))
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError((error) => ({
          title: "COFFEE",
          message: `Error: ${error.message}`,
        }))
      )
    )
    .pipe(coffee({ bare: true }))

    // .pipe(concat("gapi.js"))
    .pipe(debug({ title: "coffee 2" }))

    .pipe(app.gulp.dest(`${app.path.srcFolder}/js/libs/`))
    .on("end", done);
}
