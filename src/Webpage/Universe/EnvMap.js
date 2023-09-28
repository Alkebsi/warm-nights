import * as THREE from "three";
import SiteManager from "../SiteManager";

export default class EnvMap {
  constructor() {
    this.siteManager = new SiteManager();
    this.scene = this.siteManager.scene.instance;
    this.interval = this.siteManager.interval;
    this.resources = this.siteManager.resources;

    this.cubeTextureLoader = new THREE.CubeTextureLoader(
      this.resources.loadingManager
    );

    this.setInstance();
  }

  setInstance() {
    this.instance = this.cubeTextureLoader.load([
      "./textures/envMap/px.jpg",
      "./textures/envMap/nx.jpg",
      "./textures/envMap/py.jpg",
      "./textures/envMap/ny.jpg",
      "./textures/envMap/pz.jpg",
      "./textures/envMap/nz.jpg"
    ]);

    this.instance.colorSpace = THREE.SRGBColorSpace;

    this.scene.background = this.instance;

    // console.log(this.instance)
  }

  update() {
    this.scene.background.rotation = this.interval.elapse; 
  }
}
