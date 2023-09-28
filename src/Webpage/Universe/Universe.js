import SiteManager from "../SiteManager";
import Models from "./Models";
import Grass from "./Grass";
import Hedgehog from "./Hedgehog";
import Particles from "./Particles";
import EnvMap from "./EnvMap";
import MouseFollow from "./MouseFollow";
import ScrollAnimator from "./ScrollAnimator";

export default class Universe {
  constructor() {
    this.siteManager = new SiteManager();
    this.scene = this.siteManager.scene.instance;
    this.tests = this.siteManager.tests;

    this.models = new Models();
    this.hedgehog = new Hedgehog();
    this.grass = new Grass(this.hedgehog);
    this.particles = new Particles();
    this.envMap = new EnvMap();
    this.mouseFollow = new MouseFollow();
    this.textManager = new ScrollAnimator();
    
  }

  resize() {
    this.particles.resize();
  }

  update() {
    this.models.update();
    this.hedgehog.update();
    this.grass.update();
    this.particles.update();
    this.envMap.update();
    this.mouseFollow.update();
  }
}
