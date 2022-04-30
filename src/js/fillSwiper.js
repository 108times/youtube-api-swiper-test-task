export default function fillSwiper({
  data,
  clear = (s) => (s.innerHTML = ""),
}) {
  return new Promise((resolve) => {
    const swiperWrapper = document.querySelector(".swiper-wrapper");

    let additionalIdx = 1;

    const condition = (number) => {
      if (number === 1 || number === additionalIdx) {
        additionalIdx += 3;
        return { where: "start" };
      }

      if (number % 3 === 0) {
        return { where: "end" };
      }
      return false;
    };

    const placeSlideTag = (place) => {
      if (typeof place === "string") {
        return place === "start" ? "<div class='swiper-slide'>" : "</div>";
      }

      return "";
    };

    const html = data.items
      .map((video, idx) => {
        const href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        const { url: thumbnail } = video.snippet.thumbnails.high;
        const title = video.snippet.title;

        idx = idx + 1;
        const shouldPlaceSlideTag = condition(idx);
        const { where } = shouldPlaceSlideTag;
        console.group(idx);
        console.log(placeSlideTag(where));
        const result = `
            ${where === "start" ? placeSlideTag(where) : ""}
              <div class="swiper-slide-part">
                <a href="${href}" class="swiper-link" target="_blank">
                        <div class="swiper-image-wrapper">
                            <img class="swiper-image" src="${thumbnail}" alt="${title}" >
                        </div>
                </a>
                <span class="swiper-shadow"></span>
              </div>
            ${where === "end" ? placeSlideTag(where) : ""}`;
        console.groupEnd(idx);
        return result;
      })
      .join("");
    console.log(html);
    clear(swiperWrapper);
    swiperWrapper.insertAdjacentHTML("beforeend", html);
    setTimeout(resolve);
  });
}
