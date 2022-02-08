const imgTextContainer = document.querySelector(".imgTextContainer");
const navLinks = document.querySelector(".navbar-nav");
const navBrand = document.querySelector(".navbar-brand");
const header = document.querySelector(".headline");
const calcContainer = document.querySelector(".calculator");
const deviceApp = document.querySelector(".device__appliances");
const deviceCalc = document.querySelector(".device__calculator");
const secFAQ = document.querySelector(".sec__faq");
const faqContainer = document.querySelector(".faq__container");
const secContact = document.querySelector(".sec__contact");
const contactContainer = document.querySelector(".contact__container");
const totalValue = document.querySelectorAll(".total__value");

// Landing Page Animation
const landingTl = new TimelineMax();

landingTl
  .fromTo(
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
    { opacity: "100%", top: "30%", ease: Power2.easeInOut },
    "-=0.9"
  )
  .fromTo(navBrand, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
  .fromTo(navLinks, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
  .fromTo(navBrand, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");

// Section Calculator Animation

let calcTl = gsap.timeline({
  scrollTrigger: {
    trigger: calcContainer,
    start: "center bottom",
  },
});

calcTl
  .from(deviceApp, {
    x: -300,
    opacity: 0,
    duration: 1.5,
    ease: Power2.easeInOut,
  })
  .from(
    deviceCalc,
    { x: 300, opacity: 0, duration: 1.2, ease: Power2.easeInOut },
    "-=1.2"
  );

// Section FAQ Animation

let faqTl = gsap.timeline({
  scrollTrigger: {
    trigger: secFAQ,
    start: "center bottom",
  },
});

faqTl
  .from(secFAQ, { x: -2000, opacity: 0, duration: 2, ease: Power2.easeInOut })
  .from(
    faqContainer,
    { y: 500, opacity: 0, duration: 1.2, ease: Power2.easeInOut },
    "+1.5"
  );

// Section Contact Animation

let contactTl = gsap.timeline({
  scrollTrigger: {
    trigger: secContact,
    start: "center bottom",
  },
});

contactTl
  .fromTo(
    secContact,
    1.2,
    { x: "-100%", opacity: 0 },
    { x: "0%", opacity: 100, ease: Power2.easeInOut },
    "-="
  )
  .from(
    contactContainer,
    { x: 500, opacity: 0, duration: 1.2, ease: Power2.easeInOut },
    "-=0.5"
  );
