export default function fillSwiper(data) {
  return new Promise((resolve) => {
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    swiperWrapper.innerHTML = "";

    const html = data.items
      .map((video) => {
        const href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        const {
          url: thumbnail,
          width: thumbnailW,
          height: thumbnailH,
        } = video.snippet.thumbnails.high;
        const title = video.snippet.title;
        return `<div class="swiper-slide">
            <a href="${href}" class="swiper-link" target="_blank">
                    <img class="swiper-image" src="${thumbnail}" alt="${title}" >
                    <i class="icon-play"></i>
                    <span class="swiper-shadow"></span>
                  </a>
            </div>`;
      })
      .join("");
    swiperWrapper.insertAdjacentHTML("beforeend", html);
    setTimeout(resolve);
  });
}
