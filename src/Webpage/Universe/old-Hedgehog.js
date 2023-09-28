import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as CANNON from "../../libs/cannon.min.js";
import SiteManager from "../SiteManager.js";

export default class Hedgehog {
  constructor() {
    this.siteManager = new SiteManager();
    this.scene = this.siteManager.scene.instance;
    this.interval = this.siteManager.interval;

    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();

    this.setInstance();
    this.setPhysics();
  }

  setInstance() {
    // Setting up the materials
    this.hedgehogBodyMatcap = this.textureLoader.load(
      "./textures/matcaps/body.jpg"
    );
    this.hedgehogBodyMatcap.colorSpace = THREE.SRGBColorSpace;
    this.hedgehogBodyMaterial = new THREE.MeshMatcapMaterial({
      matcap: this.hedgehogBodyMatcap,
    });
    this.hedgehogSpinesMatcap = this.textureLoader.load(
      "./textures/matcaps/spines.jpg"
    );
    this.hedgehogSpinesMatcap.colorSpace = THREE.SRGBColorSpace;
    this.hedgehogSpinesMaterial = new THREE.MeshMatcapMaterial({
      matcap: this.hedgehogSpinesMatcap,
    });

    // Adding the model
    this.hedgehog = this.gltfLoader.load("./models/hedgehog.glb", (gltf) => {
      // Serching for the objects
      this.hedgehogBody = gltf.scene.children.find(
        (child) => child.name === "body"
      );
      this.hedgehogSpine = gltf.scene.children.find(
        (child) => child.name === "spines"
      );
      this.hedgehogSkin = gltf.scene.children.find(
        (child) => child.name === "skin"
      );

      // Applying the materials on the found objects
      this.hedgehogBody.material = this.hedgehogBodyMaterial;
      this.hedgehogSpine.material = this.hedgehogSpinesMaterial;
      this.hedgehogSkin.material = this.hedgehogSpinesMaterial;

      this.hedgehog = gltf.scene;
      this.hedgehog.scale.set(0.5, 0.5, 0.5);

      // Making sure of the hedgehog direction
      this.hedgehogPreviousXPos = {
        x: this.hedgehog.position.x,
        y: this.hedgehog.position.y,
        z: this.hedgehog.position.z,
      };

      // Adding the models to the scene
      this.scene.add(gltf.scene);
      console.log(gltf.scene.children);
    });

    // Creating a rotation manager
    this.hedgehogRotationMgr = new THREE.Mesh(
      new THREE.SphereGeometry(),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
      })
    );
    this.hedgehogRotationMgr.scale.set(0.5, 0.5, 0.5);
    this.scene.add(this.hedgehogRotationMgr);
  }

  setPhysics() {
    // Calling the physics world
    this.phy = new CANNON.World();

    // Setting some general properties
    this.phy.gravity = new CANNON.Vec3(0, -9.82, 0);
    this.defaultMaterial = new CANNON.Material("default");
    this.defaultContactMaterial = new CANNON.ContactMaterial(
      this.defaultMaterial,
      this.defaultMaterial,
      {
        friction: 1.0,
        restitution: 0.4,
      }
    );
    this.phy.defaultContactMaterial = this.defaultContactMaterial;

    // Creating the ball physics
    this.ballShape = new CANNON.Sphere(0.4);
    this.ballBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(-6, 7, -6),
      shape: this.ballShape,
    });
    this.phy.addBody(this.ballBody);

    // Adding a floor
    this.planeShape = new CANNON.Plane();
    this.planeBody = new CANNON.Body({
      mass: 0,
      shape: this.planeShape,
    });
    this.planeBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
    );
    this.phy.addBody(this.planeBody);

    // Adding the walls
    this.frontWall = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      position: new CANNON.Vec3(0, 0, -8),
    });
    this.phy.addBody(this.frontWall);

    this.rightWall = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      position: new CANNON.Vec3(7.5, 0, 0),
    });
    this.rightWall.quaternion.setFromAxisAngle(
      new CANNON.Vec3(0, -1, 0),
      Math.PI * 0.5
    );
    this.phy.addBody(this.rightWall);

    this.leftWall = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      position: new CANNON.Vec3(-7.25, 0, 0),
    });
    this.leftWall.quaternion.setFromAxisAngle(
      new CANNON.Vec3(0, 1, 0),
      Math.PI * 0.5
    );
    this.phy.addBody(this.leftWall);

    this.backWall = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      position: new CANNON.Vec3(0, 0, 10),
    });
    this.backWall.quaternion.setFromAxisAngle(
      new CANNON.Vec3(0, 1, 0),
      Math.PI
    );
    this.phy.addBody(this.backWall);

    // Adding a cube for the ladder
    this.ladderBody1 = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(new CANNON.Vec3(0.93, 0.5, 0.7)),
      position: new CANNON.Vec3(0, 0.7, -7.2),
    });
    this.phy.addBody(this.ladderBody1);
    this.ladderBody2 = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(new CANNON.Vec3(0.93, 0.19, 0.25)),
      position: new CANNON.Vec3(0, 0.7, -6.3),
    });
    this.phy.addBody(this.ladderBody2);
    this.ladderBody3 = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(new CANNON.Vec3(0.93, 0.19, 0.25)),
      position: new CANNON.Vec3(0, 0.35, -5.9),
    });
    this.phy.addBody(this.ladderBody3);

    // Adding the car container
    this.carBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(new CANNON.Vec3(1, 3, 2.5)),
      position: new CANNON.Vec3(-4.7, 1, -0.5),
    });
    this.phy.addBody(this.carBody);

    // // Note: Used this code to test cannon bodys while creating them
    // this.CannonHelper = new THREE.Mesh(
    //   new THREE.BoxGeometry(
    //     this.carBody.shapes[0].halfExtents.x * 2,
    //     this.carBody.shapes[0].halfExtents.y * 2,
    //     this.carBody.shapes[0].halfExtents.z * 2,
    //   ),
    //   new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
    // );
    // this.CannonHelper.position.copy(this.carBody.position);
    // this.scene.add(this.CannonHelper);

    window.addEventListener("click", () => {
      console.log(this.hedgehogRotationMgr.rotation.x);
    });
  }

  update() {
    this.phy.step(1 / 60, this.interval.delta / 1000, 3);
    if (this.hedgehog) {
      this.hedgehog.position.copy(this.ballBody.position);
      this.hedgehogRotationMgr.quaternion.copy(this.ballBody.quaternion);
      this.hedgehog.rotation.x = this.hedgehogRotationMgr.rotation.x;

      // Setting the hedgehog direction
      if (this.hedgehog.position.x > this.hedgehogPreviousXPos.x) {
        // console.log("it is moving right");

        this.hedgehog.rotation.z =
          this.hedgehog.position.x - this.hedgehogPreviousXPos.x;

        this.hedgehogPreviousXPos.x = this.hedgehog.position.x;
      } else if (this.hedgehog.position.x < this.hedgehogPreviousXPos.x) {
        // console.log("it is moving left");

        this.hedgehogPreviousXPos.x = this.hedgehog.position.x;
      } else {
        // console.log("It is not moving");
      }
      // console.log(this.hedgehogPreviousXPos)
    }
  }
}
