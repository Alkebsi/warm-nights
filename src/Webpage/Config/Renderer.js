import * as THREE from "three";
import SiteManager from "../SiteManager";

export default class Renderer {
  constructor() {
    this.siteManager = new SiteManager();
    this.sizes = this.siteManager.sizes;
    this.camera = this.siteManager.camera;
    this.canvas = this.siteManager.canvas;
    this.scene = this.siteManager.scene.instance;
    this.tests = this.siteManager.tests;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      // logarithmicDepthBuffer: true,
      powerPreference: "high-performance",
      antialias: true,
    });
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    // this.instance.toneMapping = THREE.CineonToneMapping;
    // this.instance.toneMappingExposure = 3.5;
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
