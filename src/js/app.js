import * as utilityFns from "./utils.js";
import loadYoutubeVideosData from "./youtube.js";
import fillSwiper from "./fillSwiper.js";
import initSwiper from "./swiper.js";

function app() {
  // check webp availability
  utilityFns.isWebp();

  loadYoutubeVideosData((data) =>
    fillSwiper({ data: data.result }).then(initSwiper)
  );
}

document.addEventListener("DOMContentLoaded", app);
