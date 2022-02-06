const img = document.querySelector(".headline__img");
const imgTextContainer = document.querySelector(".imgTextContainer");
const masthead = document.querySelector(".masthead");
const navLinks = document.querySelector(".navbar-nav");
const navBrand = document.querySelector(".navbar-brand");
const header = document.querySelector(".headline");

const tl = new TimelineMax();

tl.fromTo(
  imgTextContainer,
  1,
  { height: "0%" },
  { height: "70%", ease: Power2.easeInOut }
)
  .fromTo(
    imgTextContainer,
    1.2,
    { width: "100%" },
    { width: "90%", ease: Power2.easeInOut }
  )
  .fromTo(
    header,
    1,
    { opacity: "0%", top: "20%" },
    { opacity: "100%", top: "40%", ease: Power2.easeInOut },
    "-=0.9"
  )
  .fromTo(navBrand, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
  .fromTo(navLinks, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
  .fromTo(navBrand, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");
