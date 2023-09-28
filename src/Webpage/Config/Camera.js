import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SiteManager from "../SiteManager";

export default class camera {
  constructor() {
    this.siteManager = new SiteManager();
    this.scene = this.siteManager.scene.instance;
    this.sizes = this.siteManager.sizes;
    this.canvas = this.siteManager.canvas;
    this.tests = this.siteManager.tests;

    this.lookAtObject = new THREE.Vector3(0, 3, -4);
    this.noParallax = false;

    this.isMobile = false;
    if (navigator.userAgentData !== undefined) {
      this.isMobile = navigator.userAgentData.mobile;
    } else {
      if (this.sizes.width > this.sizes.height) {
        this.isMobile = false;
      } else {
        this.isMobile = true;
      }
    }

    this.setInstance();
    this.setOrbitControls();
    if (this.tests.active) {
      this.setTests();
    }
  }

  setInstance() {
    this.instanceGroup = new THREE.Group();
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.01,
      100
    );
    this.instance.position.set(10.77, 5.16, 3.18);
    this.instanceGroup.add(this.instance);
    this.scene.add(this.instanceGroup);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enabled = false;
  }

  setTests() {
    this.tests.camera = this.tests.gui.addFolder("Camera");
    this.tests.cameraPos = this.tests.camera.addFolder("CameraPosition");
    this.tests.lookAtPos = this.tests.camera.addFolder("LookAtPosition");

    this.tests.cameraPos.add(this.instance.position, "x", -20, 20, 0.1);
    this.tests.cameraPos.add(this.instance.position, "y", -20, 20, 0.1);
    this.tests.cameraPos.add(this.instance.position, "z", -20, 20, 0.1);

    this.tests.lookAtPos.add(this.lookAtObject, "x", -20, 20, 0.1);
    this.tests.lookAtPos.add(this.lookAtObject, "y", -20, 20, 0.1);
    this.tests.lookAtPos.add(this.lookAtObject, "z", -20, 20, 0.1);

    this.tests.camera
      .add(this.controls, "enabled")
      .name("OrbitControls")
      .onChange(() => {
        alert("You need to refresh the page to have the things back");
        document.querySelector("#webgl").style.zIndex = "79";
      });
    this.tests.camera.add(this, "noParallax").name("StopParallax");
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    // Setup the parallax effect for Desktops, gyroscope for mobiles
    if (this.isMobile && !this.noParallax) {
      this.instanceGroup.position.x = this.sizes.gyro.x;
      this.instanceGroup.position.y = this.sizes.gyro.y;
    } else if (!this.noParallax) {
      this.instanceGroup.position.x +=
        (this.sizes.mouseLocation.x - this.instanceGroup.position.x) * 0.07;
      this.instanceGroup.position.y +=
        (this.sizes.mouseLocation.y - this.instanceGroup.position.y) * 0.07;
    } else {
      this.instanceGroup.position.set(0, 0, 0);
    }

    if (this.controls.enabled) {
      this.controls.update();
    } else {
      this.instance.lookAt(this.lookAtObject);
    }
  }
}
