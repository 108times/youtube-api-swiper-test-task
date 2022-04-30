// core version + navigation, pagination modules:
import Swiper, { Pagination, Autoplay, Navigation } from "swiper";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// init Swiper:
export default function initSwiper(data) {
  const navigationOpts = {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  };

  const navigationElements = Object.keys(navigationOpts).map((el) =>
    document.querySelector(navigationOpts[el])
  );
  let bulletsCount;

  setTimeout(() => {
    bulletsCount = document.querySelectorAll(
      ".swiper-pagination-bullet"
    ).length;
  });

  const setNavigationItemState = (name, active) =>
    navigationElements.forEach((elem) => {
      console.log(elem.classList, name);
      if (elem.classList.contains(`swiper-button-${name}`)) {
        if (active) {
          elem.classList.add("active");
        } else {
          elem.classList.remove("active");
        }
      }
    });

  const swiper = new Swiper(".swiper", {
    // configure Swiper to use modules
    modules: [Pagination, Autoplay, Navigation],
    // Optional parameters
    loop: true,

    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
    navigation: navigationOpts,
  });
  swiper.on("slideChange", function () {
    if (swiper.activeIndex > 1 || swiper.activeIndex > bulletsCount) {
      setNavigationItemState("prev", true);
    } else {
      setNavigationItemState("prev", false);
    }
    if (swiper.activeIndex < bulletsCount) {
      setNavigationItemState("next", true);
    } else {
      setNavigationItemState("next", false);
    }
  });
  return swiper;
}
