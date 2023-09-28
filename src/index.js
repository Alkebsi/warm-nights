/*
 *
 *** Site: A Little Warm Night
 *** Author: Mohammed Alkebsi (MKebsi)
 *** URL: https://github.com/alkebsi/a-little-warm-night
 *** License: OpenSource - Apache 2.0
 *** Credits:
 ****** Models: Car Model - Sketchfab (https://sketchfab.com/)
 ************** Other Models - Created from zero inside Blender by (MKebsi)
 ************** Renderer - Baked lights and shadows using Cycles inside Blender, No
 ************************  Three.js light or shadows at all.
 ****** Libraries: Three.js, GSAP, Cannon.js, and Webpack
 ****** Other Credits: That is a thanks to my family and specially my brother, though he won't read this code!
 * ------------------------------------------------
 * Note: bla, bla, bla...
 * ------------------------------------------------
 *
 */
import SiteManager from "./Webpage/SiteManager";

/*
 * Calling and managing the Three.js content
 */
const canvas = document.getElementById("webgl");
const loadingPanel = document.getElementById("loading-panel");
// console.log(document.body.innerHTML)
const siteManager = new SiteManager(canvas, loadingPanel);

/*
 * Managing the right paned interactivity
 */
// Toggling the right panel
const dashesCon = document.querySelector("#dashes-con");
const overlay = document.querySelector("#rp-overlay");
const rigthPanel = document.querySelector("#right-panel");
const rpLinksCon = document.querySelector("#rp-links-con");
const rpLinks = document.querySelectorAll(".rp-links");

let togglePanel = true;

const toggleRightPanel = () => {
  if (togglePanel) {
    // Change the Dashes
    dashesCon.children[0].style.transform = "translate(0, 7px) rotate(45deg)";
    dashesCon.children[1].style.opacity = "0";
    dashesCon.children[2].style.transform = "translate(0, -7px) rotate(-45deg)";

    // Setup the overlay
    overlay.style.display = "block";
    overlay.style.background = "rgba(0, 0, 0, 0.6)";

    // Change the right panel
    rigthPanel.style.pointerEvents = "initial";
    rpLinksCon.style.pointerEvents = "initial";
    for (const link of rpLinks) {
      link.style.transform = "translate(0, 0)";
    }

    // Toggle the Panel
    togglePanel = false;
  } else {
    // Change the Dashes
    dashesCon.children[0].style.transform = "translate(0, 0) rotate(0)";
    dashesCon.children[1].style.opacity = "1";
    dashesCon.children[2].style.transform = "translate(0, 0) rotate(0)";

    // Setup the overlay
    overlay.style.background = "rgba(0, 0, 0, 0)";
    window.setTimeout(() => {
      overlay.style.display = "none";
    }, 300);

    // Change the rigth panel
    rigthPanel.style.pointerEvents = "none";
    rpLinksCon.style.pointerEvents = "none";
    for (const link of rpLinks) {
      link.style.transform = "translate(100%, 0)";
    }

    // Toggle the Panel
    togglePanel = true;
  }
};

dashesCon.addEventListener("click", toggleRightPanel);

/*
 * Credits Panel
 */
const credits = document.querySelector("#credits");
const creditsCon = document.querySelector("#credits-con");
const creditsLink = document.querySelector("#rp-link5");
const creditsX = document.querySelector("#credits-x");

let toggleCredits = true;

const toggleCreditsPanel = () => {
  if (toggleCredits) {
    credits.style.opacity = "1";
    credits.style.pointerEvents = "auto";

    creditsCon.style.animation = "credits-anim 50s linear infinite";

    // Close the right panel once the credits link is clicked
    toggleRightPanel();

    toggleCredits = false;
  } else {
    credits.style.opacity = "0";
    credits.style.pointerEvents = "none";

    window.setTimeout(() => {
      creditsCon.style.animation = "none";
    }, 500);

    toggleCredits = true;
  }
};

creditsLink.addEventListener("click", toggleCreditsPanel);
creditsX.addEventListener("click", toggleCreditsPanel);
