// Main Style Sheet
import "../style.css";

// Utils
import Resources from "./Utils/Resources";
import Tests from "./Utils/Tests";
import Sizes from "./Utils/Sizes";
import Interval from "./Utils/Interval";
import Raycaster from "./Utils/Raycaster";

// Three.js Configurations
import Scene from "./Config/Scene";
import Camera from "./Config/Camera";
import Renderer from "./Config/Renderer";

// Three.js Visual Assets
import Universe from "./Universe/Universe";

let instance = null; // this is the variable used inside the SiteManager class

export default class SiteManager {
  constructor(canvas, loadingPanel) {
    // Global variables
    // window.siteManager = this; // indeed not in need

    // Checking if it was called once before
    if (instance) {
      return instance;
    }
    instance = this;

    // Parameters
    this.canvas = canvas;
    this.loadingPanel = loadingPanel;

    // Fetching Utils
    this.resources = new Resources(this.loadingPanel);
    this.tests = new Tests();
    this.sizes = new Sizes();
    this.interval = new Interval();

    // Fetching Three.js Elements
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.universe = new Universe();
    this.raycaster = new Raycaster();

    // Calling Methods
    window.addEventListener("dblclick", () => {
      this.sizes.fullScreen();
    });
    window.addEventListener("resize", () => {
      this.resize();
    });
    requestAnimationFrame(() => {
      this.update();
    });

    // Finall Log
    console.log("Site is ready");
  }

  // Called once the page is resized
  resize() {
    this.sizes.resize();
    this.camera.resize();
    this.renderer.resize(); // This line is a must
    this.universe.resize();
  }

  // Called every frame (60fps)
  update() {
    if (this.tests.active) {
      this.tests.stats.begin();
      this.interval.update();
      this.camera.update();
      this.universe.update();
      this.raycaster.update();
      this.renderer.update(); // Not in need as long as I use passes
      this.tests.stats.end();
    } else {
      this.interval.update();
      this.camera.update();
      this.universe.update();
      this.raycaster.update();
      this.renderer.update(); // Not in need, too.
    }
    
    requestAnimationFrame(() => {
      this.update();
    });
  }
}
