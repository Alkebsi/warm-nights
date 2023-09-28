import * as THREE from "three";
import * as CANNON from "../../libs/cannon.min.js";
import gsap from "gsap";
import SiteManager from "../SiteManager";

export default class Raycaster {
  constructor() {
    this.siteManager = new SiteManager();
    this.scene = this.siteManager.scene.instance;
    this.camera = this.siteManager.camera.instance;
    this.sizes = this.siteManager.sizes;
    this.hedgehogBody = this.siteManager.universe.hedgehog.hedgehogBody;
    this.floor = this.siteManager.universe.floor;
    this.models = this.siteManager.universe.models;
    this.resources = this.siteManager.resources;

    this.hedgehogIntersection = null;
    this.coneIntersect = null;
    this.callOnce = true;

    this.setIntersectingFloor();
    this.setInstance();
    // if (this.resources.ready) {
    //   this.setIntersectionClicks(); // It is called once the site is ready in the update function
    // }
  }

  setIntersectingFloor() {
    this.floor = new THREE.Mesh(
      new THREE.PlaneGeometry(28, 19),
      new THREE.MeshBasicMaterial({
        color: 0xe5c19d,
        side: THREE.DoubleSide,
        opacity: 0,
        transparent: true,
      })
    );
    this.floor.rotation.x = Math.PI * 0.5;
    this.floor.position.z = 1;
    this.scene.add(this.floor);
  }

  setIntersectionClicks() {
    window.addEventListener("click", () => {
      // Make the hedgehog jump once clicked
      if (this.hedgehogIntersection) {
        this.hedgehogBody.applyForce(
          new CANNON.Vec3(0, 700, 0),
          new CANNON.Vec3(
            this.hedgehogIntersection.point.x,
            this.hedgehogIntersection.point.y,
            this.hedgehogIntersection.point.z
          )
        );
      }

      // Make the cube fall once clicked
      if (this.cubeIntersection[0]) {
        gsap.to(this.models.cube.position, {
          duration: 2,
          ease: "power2.inOut",
          y: "0",
        });
        gsap.to(this.models.cube.position, {
          duration: 1,
          delay: 2,
          ease: "power2.inOut",
          y: "4",
        });
        window.setTimeout(() => {
          alert(
            String.fromCharCode(
              87,
              104,
              121,
              32,
              105,
              110,
              32,
              116,
              104,
              101,
              32,
              104,
              101,
              108,
              108,
              32,
              100,
              105,
              100,
              32,
              121,
              111,
              117,
              32,
              99,
              108,
              105,
              99,
              107,
              101,
              100,
              32,
              111,
              110,
              32,
              116,
              104,
              101,
              32,
              99,
              117,
              98,
              101,
              63,
              32,
              84,
              104,
              97,
              116,
              32,
              105,
              115,
              32,
              97,
              32,
              112,
              115,
              121,
              99,
              104,
              111,
              112,
              97,
              116,
              104,
              105,
              99,
              97,
              108,
              32,
              98,
              101,
              104,
              97,
              118,
              105,
              111,
              114,
              44,
              32,
              105,
              115,
              110,
              39,
              116,
              32,
              105,
              116,
              63
            )
          );
        }, 3000);
      }

      // Make the cone rotate once clicked
      if (this.coneIntersection[0]) {
        gsap.to(this.models.cone.rotation, {
          duration: 1,
          ease: "power2.inOut",
          y: "+=5",
        });
      }
    });
    window.addEventListener("keypress", (event) => {
      if (event.key == " " && this.hedgehogBody.position.y <= 0.6) {
        this.hedgehogBody.applyForce(
          new CANNON.Vec3(0, 500, 0),
          this.hedgehogBody.position
        );
      }
    });
  }

  setInstance() {
    this.instance = new THREE.Raycaster();
  }

  update() {
    this.instance.setFromCamera(this.sizes.mouseLocation, this.camera);

    // Setting the needed assets once the site is loaded
    if (this.resources.ready && this.callOnce === true) {
      this.hedgehog = this.siteManager.universe.hedgehog.hedgehog;
      this.setIntersectionClicks();
      this.callOnce = false;
    }

    // Setting intersecting floor
    this.floorIntersect = this.instance.intersectObject(this.floor);
    if (this.floorIntersect[0] && this.sizes.mouseLocation.x != 0) {
      this.hedgehogBody.applyForce(
        new CANNON.Vec3(
          this.floorIntersect[0].point.x - this.hedgehogBody.position.x,
          this.floorIntersect[0].point.y - this.hedgehogBody.position.y,
          this.floorIntersect[0].point.z - this.hedgehogBody.position.z
        ),
        this.hedgehogBody.position
      );
    }

    // Setting the hedgehog intersection
    if (this.hedgehog) {
      this.hedgehogIntersect = this.instance.intersectObject(this.hedgehog);
      if (this.hedgehogIntersect[0]) {
        if (this.hedgehogIntersection == null) {
          document.body.style.cursor = "grabbing";
        }
        this.hedgehogIntersection = this.hedgehogIntersect[0];
      } else {
        if (this.hedgehogIntersection) {
          window.setTimeout(() => {
            document.body.style.cursor = "initial";
          }, 500); // To avoid flickring
        }
        this.hedgehogIntersection = null;
      }
    }

    // Setting the Cone, Sphere, and Cube Intersections
    if (this.resources.ready) {
      this.cubeIntersection = this.instance.intersectObject(this.models.cube);
      this.coneIntersection = this.instance.intersectObject(this.models.cone);
      this.sphereIntersection = this.instance.intersectObject(
        this.models.sphere
      );

      // Make the cube rotates faster once the mouse hovers over it
      if (this.cubeIntersection[0]) {
        gsap.to(this.models.cube.rotation, {
          duration: 1,
          x: "+=2",
          z: "+=2",
        });
      }

      // Change the mouse cursor once hoviring over the cone
      if (this.coneIntersection[0]) {
        if (this.coneIntersect == null) {
          document.body.style.cursor = "pointer";
        }

        this.coneIntersect = this.coneIntersection[0];
      } else {
        if (this.coneIntersect) {
          document.body.style.cursor = "initial";
        }
        this.coneIntersect = null;
      }

      // Make the sphere run away from the mouse pointer
      if (this.sphereIntersection[0]) {
        gsap.to(this.models.sphere.position, {
          duration: 1,
          ease: "expo",
          x: `+=${(Math.random() - 0.5) * 3}`,
          y: `+=${Math.random()}`,
          z: `+=${Math.random() * 1.5}`,
        });
        gsap.to(this.models.sphere.position, {
          duration: 5,
          delay: 0.5,
          x: "1",
          y: "2",
          z: "-6",
        });
      }
    }
  }
}
