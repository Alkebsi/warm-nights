import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as CANNON from "../../libs/cannon.min.js";
import SiteManager from "../SiteManager.js";

export default class Hedgehog {
  constructor() {
    this.siteManager = new SiteManager();
    this.scene = this.siteManager.scene.instance;
    this.interval = this.siteManager.interval;
    this.resources = this.siteManager.resources;

    this.gltfLoader = new GLTFLoader(this.resources.loadingManager);
    this.textureLoader = new THREE.TextureLoader(this.resources.loadingManager);

    this.setInstance();
    this.setPhysics();
  }

  setInstance() {
    // Setting up the materials
    this.ballMatcap = this.textureLoader.load("./textures/matcaps/body.jpg");
    this.ballMatcap.colorSpace = THREE.SRGBColorSpace;
    this.ballMaterial = new THREE.MeshMatcapMaterial({
      matcap: this.ballMatcap,
    });
    this.innerElementMatcap = this.textureLoader.load(
      "./textures/matcaps/innerElement.jpg"
    );
    this.innerElementMatcap.colorSpace = THREE.SRGBColorSpace;
    this.innerElementMaterial = new THREE.MeshMatcapMaterial({
      matcap: this.innerElementMatcap,
    });

    // Adding the model
    this.hedgehog = this.gltfLoader.load("./models/ball.glb", (gltf) => {
      // Applying the materials on the found objects
      this.innerElement = gltf.scene.children[0];
      this.ball = gltf.scene.children[1];

      this.innerElement.material = this.innerElementMaterial;
      this.ball.material = this.ballMaterial;

      this.hedgehog = gltf.scene;
      this.hedgehog.scale.set(0.4, 0.4, 0.4);

      // Making sure of the hedgehog direction
      this.hedgehogPreviousXPos = {
        x: this.hedgehog.position.x,
        y: this.hedgehog.position.y,
        z: this.hedgehog.position.z,
      };

      // Adding the models to the scene
      this.scene.add(this.hedgehog);
    });
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
        friction: 5.0, // Just to make sure it never slides around
        restitution: 0.4,
      }
    );
    this.phy.defaultContactMaterial = this.defaultContactMaterial;

    // Creating the hedgehog physics
    this.hedgehogShape = new CANNON.Sphere(0.4);
    this.hedgehogBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(-6, 7, -6),
      shape: this.hedgehogShape,
    });
    this.phy.addBody(this.hedgehogBody);

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
  }

  update() {
    this.phy.step(1 / 60, this.interval.delta / 1000, 3);
    if (this.hedgehog) {
      this.hedgehog.position.copy(this.hedgehogBody.position);

      this.ball.quaternion.copy(this.hedgehogBody.quaternion);
      this.innerElement.quaternion.copy(this.hedgehogBody.quaternion.inverse());
    }
  }
}
