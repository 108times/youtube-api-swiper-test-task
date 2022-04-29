import remoteSrc from "gulp-remote-src";

export const importExternalJs = () =>
  remoteSrc(["api.js"], {
    base: "https://apis.google.com/js/",
  }).pipe(app.gulp.dest(`${app.path.srcFolder}/js/libs/gapi`));
