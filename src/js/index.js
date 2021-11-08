import '../style/index.scss'

function lerp(v0, v1, t) {
  return v0 + t * (v1 - v0);
}
function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch(e) {}
    return supportsPassiveOption;
}
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  lerp: 0.15
});

const shadowAnimation = (selector) => {
  const shadowEl = document.querySelector(selector);
  const defaultHeight = 70;
  let currentHeight = 70;
  let prevProgress = 0;
  const updateHeight = () => {
    shadowEl.style.height = currentHeight + 'px';
  }
  const loop = () => {
    currentHeight = lerp(defaultHeight, currentHeight, 0.2);
    updateHeight();
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);

  return function(progress) {
    const progressDelta = progress - prevProgress;
    prevProgress = progress;
    let offset = 10000 * progressDelta;
    currentHeight += offset;
  }
}
const beginerShadowAnimate = shadowAnimation('.beginer .shadow');

scroll.on('scroll', (args) => {
  // Get all current elements : args.currentElements
  if(typeof args.currentElements['hey'] === 'object') {
    let progress = args.currentElements['hey'].progress;
    beginerShadowAnimate(progress);
    // ouput log example: 0.34
    // gsap example : myGsapAnimation.progress(progress);
  }
});

const walkthroughsSwiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    afterInit: function () {
      scroll.update();
    },
  },
});
