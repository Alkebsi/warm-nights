import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import SiteManager from "../SiteManager";

export default class Models {
  constructor() {
    this.siteManager = new SiteManager();
    this.scene = this.siteManager.scene.instance;
    this.interval = this.siteManager.interval;
    this.tests = this.siteManager.tests;
    this.resources = this.siteManager.resources;

    this.textureLoader = new THREE.TextureLoader(this.resources.loadingManager);
    this.gltfLoader = new GLTFLoader(this.resources.loadingManager);

    this.setScene();
    this.setObjects();
    this.setHomeCelling();

    if (this.tests.active) {
      this.setTests();
    }
  }

  setTrees() {
    this.treing = this.gltfLoader.load("./models/ex2.glb", (gltf) => {
      this.trMap = this.textureLoader.load("./models/ex2.jpg");
      this.trMap.flipY = false;
      this.trMap.colorSpace = THREE.SRGBColorSpace;
      this.trMaterial = new THREE.MeshBasicMaterial({
        map: this.trMap,
      });

      this.tr = gltf.scene.children[0];
      this.tr.rotation.y = Math.PI;
      this.tr.scale.set(0.2, 0.2, 0.2);
      this.tr.position.set(-15, 0, 3);

      this.tr.material = this.trMaterial;

      this.scene.add(this.tr);
    });
  }

  setScene() {
    // Fetching the textures
    this.doorMap = this.textureLoader.load("./textures/Door.jpg");
    this.starisMap = this.textureLoader.load("./textures/Stairs.jpg");
    this.lampMap = this.textureLoader.load("./textures/Lamp.jpg");
    this.rocksMap = this.textureLoader.load("./textures/Rocks.jpg");
    this.environmentMap = this.textureLoader.load("./textures/Environment.jpg");
    this.windowsMap = this.textureLoader.load("./textures/Windows.jpg");
    this.sandalsMap = this.textureLoader.load("./textures/Sandals.jpg");
    this.fencesMap = this.textureLoader.load("./textures/Fences.jpg");
    this.treesMap = this.textureLoader.load("./textures/Trees.jpg");

    // Fliping the textures
    this.doorMap.flipY = false;
    this.starisMap.flipY = false;
    this.lampMap.flipY = false;
    this.rocksMap.flipY = false;
    this.environmentMap.flipY = false;
    this.windowsMap.flipY = false;
    this.sandalsMap.flipY = false;
    this.fencesMap.flipY = false;
    this.treesMap.flipY = false;

    // Setting the color space
    this.doorMap.colorSpace = THREE.SRGBColorSpace;
    this.starisMap.colorSpace = THREE.SRGBColorSpace;
    this.lampMap.colorSpace = THREE.SRGBColorSpace;
    this.rocksMap.colorSpace = THREE.SRGBColorSpace;
    this.environmentMap.colorSpace = THREE.SRGBColorSpace;
    this.windowsMap.colorSpace = THREE.SRGBColorSpace;
    this.sandalsMap.colorSpace = THREE.SRGBColorSpace;
    this.fencesMap.colorSpace = THREE.SRGBColorSpace;
    this.treesMap.colorSpace = THREE.SRGBColorSpace;

    // Setting the materials
    this.doorMaterial = new THREE.MeshBasicMaterial({
      map: this.doorMap,
    });
    this.starisMaterial = new THREE.MeshBasicMaterial({
      map: this.starisMap,
    });
    this.lampMaterial = new THREE.MeshBasicMaterial({
      map: this.lampMap,
    });
    this.rocksMaterial = new THREE.MeshBasicMaterial({
      map: this.rocksMap,
    });
    this.environmentMaterial = new THREE.MeshBasicMaterial({
      map: this.environmentMap,
    });
    this.windowsMaterial = new THREE.MeshBasicMaterial({
      map: this.windowsMap,
    });
    this.sandalsMaterial = new THREE.MeshBasicMaterial({
      map: this.sandalsMap,
    });
    this.fencesMaterial = new THREE.MeshBasicMaterial({
      map: this.fencesMap,
    });
    this.treesMaterial = new THREE.MeshBasicMaterial({
      map: this.treesMap,
    });
    this.emmisionsMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    this.illusionsMaterail = new THREE.MeshBasicMaterial({
      color: 0xe5c19d,
      side: THREE.DoubleSide,
    });

    this.models = this.gltfLoader.load("./models/scene.glb", (gltf) => {
      // Searching for the models
      this.door = gltf.scene.children.find((child) => child.name === "Door");
      this.environment = gltf.scene.children.find(
        (child) => child.name === "Environment"
      );
      this.fences = gltf.scene.children.find(
        (child) => child.name === "Fences"
      );
      this.lamp = gltf.scene.children.find((child) => child.name === "Lamp");
      this.rock = gltf.scene.children.find((child) => child.name === "Rocks");
      this.snadals = gltf.scene.children.find(
        (child) => child.name === "Sandals"
      );
      this.staris = gltf.scene.children.find(
        (child) => child.name === "Stairs"
      );
      this.windows = gltf.scene.children.find(
        (child) => child.name === "Windows"
      );
      this.trees = gltf.scene.children.find((child) => child.name === "Trees");
      this.emmisions = gltf.scene.children.find(
        (child) => child.name === "Emmisions"
      );
      this.illusions = gltf.scene.children.find(
        (child) => child.name === "Illusions"
      );

      // Applying the materails on the found models
      this.door.material = this.doorMaterial;
      this.staris.material = this.starisMaterial;
      this.lamp.material = this.lampMaterial;
      this.rock.material = this.rocksMaterial;
      this.environment.material = this.environmentMaterial;
      this.windows.material = this.windowsMaterial;
      this.snadals.material = this.sandalsMaterial;
      this.fences.material = this.fencesMaterial;
      this.trees.material = this.treesMaterial;
      this.illusions.material = this.illusionsMaterail;
      this.emmisions.material = this.emmisionsMaterial;

      // Setting and adding the refined models to the scene
      gltf.scene.scale.set(0.3, 0.3, 0.3);
      gltf.scene.rotation.y = Math.PI;
      gltf.scene.position.set(0, 0, -2);
      this.scene.add(gltf.scene);
    });
  }

  setObjects() {
    this.objects = this.gltfLoader.load("./models/objects.glb", (gltf) => {
      // Setting the materails for every object
      gltf.scene.traverse((child) => {
        child.material = this.illusionsMaterail;
      });

      // Searching for specific objects
      this.cube = gltf.scene.children.find((child) => child.name === "Cube");
      this.sphere = gltf.scene.children.find(
        (child) => child.name === "Sphere"
      );
      this.cone = gltf.scene.children.find((child) => child.name === "Cone");

      // Setting the properties for the found objects
      this.cube.scale.set(0.3, 0.3, 0.3);
      this.cube.position.set(-1.5, 4, -5);
      this.sphere.scale.set(0.3, 0.3, 0.3);
      this.sphere.position.set(1, 2, -6);
      this.cone.scale.set(0.4, 0.4, 0.4);
      this.cone.position.set(2.5, 5, -6.5);

      // Adding the objecs to the scene
      this.scene.add(gltf.scene);

      // Making sure the objects is set correctly
      this.objects = this;
    });
  }

  setHomeCelling() {
    this.celling = new THREE.Mesh(
      new THREE.ConeGeometry(20, 10, 4),
      new THREE.MeshBasicMaterial({
        color: 0x0c0809,
      })
    );
    this.celling.position.set(0, 17.3, -22.15);
    this.celling.rotation.y = Math.PI * 0.25;
    this.scene.add(this.celling);
  }

  setTests() {
    this.tests.celling = this.tests.universe.addFolder("Celling");

    this.tests.celling.add(this.celling.position, "x", -50, 50);
    this.tests.celling.add(this.celling.position, "y", -50, 50, 0.01);
    this.tests.celling.add(this.celling.position, "z", -50, 50, 0.01);
  }

  update() {
    if (this.objects) {
      this.cube.rotation.x += this.interval.delta * 0.0005;
      this.cube.rotation.z += this.interval.delta * 0.0004;

      this.sphere.rotation.x = this.interval.elapse * 0.5;
      this.sphere.rotation.z = this.interval.elapse * 0.4;
      this.sphere.children[0].rotation.x = this.interval.elapse * 4;
      this.sphere.children[0].rotation.z = this.interval.elapse * 2;
      this.sphere.children[1].rotation.x = this.interval.elapse * 8;
      this.sphere.children[1].rotation.z = this.interval.elapse * 5;
      this.sphere.children[2].rotation.x = this.interval.elapse * 6;
      this.sphere.children[2].rotation.z = this.interval.elapse * 7;
      this.sphere.children[3].rotation.x = this.interval.elapse * 5;
      this.sphere.children[3].rotation.z = this.interval.elapse * 9;

      this.cone.rotation.y += this.interval.delta * 0.0005;
      this.cone.rotation.z = Math.sin(this.interval.elapse * 0.6) * 0.3;
    }
  }
}
