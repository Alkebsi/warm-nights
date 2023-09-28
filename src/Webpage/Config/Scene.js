/*
 * Note: I have created this saperated file to manage
 * the fog incase I needed it. Yet, haven't used it!
 */

import SiteManager from "../SiteManager";
import * as THREE from "three";

export default class Scene {
  constructor() {
    this.siteManager = new SiteManager();
    // this.tests = this.siteManager.tests;

    // this.color = {
    //   clearFogColor: 0x111111,
    // };

    this.instance = new THREE.Scene();
    // this.setFog();
    // if (this.tests.active) {
    //   this.setTests();
    // }
  }

  // setFog() {
  //   this.instance.fog = new THREE.Fog(this.color.clearFogColor, 300, 300);
  // }

  // setTests() {
  //   this.tests.fog = this.tests.universe.addFolder("Fog");

  //   // Note: Fog colors can be edited at Renderer.setTests()
  //   this.tests.fog.add(this.instance.fog, "near", 0, 50, 0.001);
  //   this.tests.fog.add(this.instance.fog, "far", 0, 50, 0.001);
  // }
}
