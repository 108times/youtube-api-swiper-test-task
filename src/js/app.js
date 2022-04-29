import * as utilityFns from "./utils.js";
import loadYoutubeVideosData from "./youtube.js";

function app() {
  // check webp availability
  utilityFns.isWebp();

  const data = loadYoutubeVideosData();
}

document.addEventListener("DOMContentLoaded", app);
