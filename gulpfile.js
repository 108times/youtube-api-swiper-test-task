// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";

// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передача часто используемых данных в глобальную переменную
global.app = {
  development: !process.argv.includes("--build"),
  path,
  gulp,
  plugins,
};

// Импорт задач
import {
  files,
  clean,
  html,
  server,
  scss,
  js,
  images,
  svgSprite,
  zip,
  ftp,
  importExternalJs,
  svgImages,
} from "./gulp/tasks/index.js";

// export for npm task
export { svgSprite };

// Наблюдатель за изменениями в файлах
const watcher = () => {
  gulp.watch(path.watch.files, files);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
};

// Последовательная обработка шрифтов
import { otfToTtf, ttfToWoff, fontsStyles } from "./gulp/tasks/fonts.js";

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyles);

export { fonts };

// Основные задачи
const mainTasks = gulp.series(
  fontsStyles,
  gulp.parallel(
    fontsStyles,
    files,
    html,
    scss,
    // coffeePipe,
    importExternalJs,
    js,
    images,
    svgImages
  )
);

// Построение сценариев выполнения задач
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(clean, fonts, mainTasks);
const deployZIP = gulp.series(clean, mainTasks, zip);
const deployFTP = gulp.series(clean, mainTasks, ftp);
// export for npm task
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Сценарий по умолчанию
gulp.task("default", dev);
