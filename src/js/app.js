import * as utilityFns from "./utils.js";
import loadYoutubeData from "./youtube.js";
import fillSwiper from "./fillSwiper.js";
import initSwiper from "./swiper.js";

function app() {
  // check webp availability
  utilityFns.isWebp();

  loadYoutubeData((data) => fillSwiper({ data: data.result }).then(initSwiper));
}

document.addEventListener("DOMContentLoaded", app);
