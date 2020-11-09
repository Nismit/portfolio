import gsap from 'gsap';

export default class SmoothScroll {
    constructor(options = {}) {
        this.options = {
            element: options.element || window,
            easing: options.easing || 0.05
        }

        gsap.set(this.options.element, { y: 0 });

        this.animationFrame = null;
        this.scrollY = 0;
        this.scrollYMax = 0;
        this.percentage = 0;


        this.init();
    }

    lerp = (a, b, t) => {
      return ((1 - t) * a + t * b);
    }

    animate() {
      gsap.set(this.options.element, { y: -this.percentage });
      this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }

    onResize(e) {
      this.scrollYMax = this.options.element.innerHeight;

      if(scrollY > this.scrollYMax) {

      }
    }

    onScroll(e) {
      // console.log('E', e);
      this.scrollY = window.pageYOffset || 0;
      this.percentage = this.lerp(this.percentage, this.scrollY, this.options.easing);
    }

    init() {
      this.scrollYMax = this.options.element.innerHeight;
      console.log(this.scrollYMax);
      window.addEventListener('resize', this.onResize.bind(this));
      // this.options.element.addEventListener('scroll', this.onScroll.bind(this));
      window.addEventListener('scroll', this.onScroll.bind(this));
      this.animate();
    }

    destroy() {
      cancelAnimationFrame(this.animationFrame);
      window.addEventListener('resize', this.onResize);
      // element.addEventListener('scroll', this.onScroll);
      window.addEventListener('scroll', this.onScroll);
    }
}


// var html = document.documentElement;
// var body = document.body;

// var scroller = {
//   target: document.querySelector("#scroll-container"),
//   ease: 0.05, // <= scroll speed
//   endY: 0,
//   y: 0,
//   resizeRequest: 1,
//   scrollRequest: 0,
// };

// var requestId = null;

// TweenLite.set(scroller.target, {
//   rotation: 0.01,
//   force3D: true
// });

// window.addEventListener("load", onLoad);

// function onLoad() {
//   updateScroller();
//   window.focus();
//   window.addEventListener("resize", onResize);
//   document.addEventListener("scroll", onScroll);
// }

// function updateScroller() {

//   var resized = scroller.resizeRequest > 0;

//   if (resized) {
//     var height = scroller.target.clientHeight;
//     body.style.height = height + "px";
//     scroller.resizeRequest = 0;
//   }

//   var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

//   scroller.endY = scrollY;
//   scroller.y += (scrollY - scroller.y) * scroller.ease;

//   if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
//     scroller.y = scrollY;
//     scroller.scrollRequest = 0;
//   }

//   TweenLite.set(scroller.target, {
//     y: -scroller.y
//   });

//   requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
// }

// function onScroll() {
//   scroller.scrollRequest++;
//   if (!requestId) {
//     requestId = requestAnimationFrame(updateScroller);
//   }
// }

// function onResize() {
//   scroller.resizeRequest++;
//   if (!requestId) {
//     requestId = requestAnimationFrame(updateScroller);
//   }
// }
