import * as THREE from "three";
import SiteManager from "../SiteManager";

// Shaders
import flysVertexShader from "../Shaders/Flys/vertex.glsl";
import flysFragmentShader from "../Shaders/Flys/fragment.glsl";

export default class Particles {
  constructor() {
    this.siteManager = new SiteManager();
    this.scene = this.siteManager.scene.instance;
    this.sizes = this.siteManager.sizes;
    this.interval = this.siteManager.interval;
    this.tests = this.siteManager.tests;
    this.resources = this.siteManager.resources;

    this.textureLoader = new THREE.TextureLoader(this.resources.loadingManager);

    this.setBackgroundParticles();
    this.setFlys();
  }

  setBackgroundParticles() {
    // Geometry
    this.backParticlesGeometry = new THREE.BufferGeometry();
    this.backPCount = 2000;
    this.backPPosition = new Float32Array(this.backPCount * 3);
    this.backPScale = new Float32Array(this.backPCount);

    for (let i = 0; i < this.backPCount * 3; i++) {
      this.backPPosition[i] = (Math.random() - 0.5) * 60;

      this.backPScale[i] = Math.random() + 0.5;
    }

    this.backParticlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.backPPosition, 3)
    );
    this.backParticlesGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(this.backPScale, 1)
    );

    // Materials
    this.backParticleMap = this.textureLoader.load(
      "./textures/particles/1.png"
    );
    this.backParticlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      alphaMap: this.backParticleMap,
      transparent: true,
      depthWrite: false,
      size: 0.2,
    });

    // Points
    this.backParticles = new THREE.Points(
      this.backParticlesGeometry,
      this.backParticlesMaterial
    );
    this.backParticles.position.set(0, 0, -15);
    this.scene.add(this.backParticles);
  }

  setFlys() {
    // Particles Geometries
    this.flyParticlesGeometry1 = new THREE.BufferGeometry();
    this.flyParticlesGeometry2 = new THREE.BufferGeometry();
    this.flyParticlesGeometry3 = new THREE.BufferGeometry();

    this.flyPCount1 = 10;
    this.flyPositions1 = new Float32Array(this.flyPCount1 * 3);
    this.flyScale1 = new Float32Array(this.flyPCount1);
    this.flyPCount2 = 10;
    this.flyPositions2 = new Float32Array(this.flyPCount2 * 3);
    this.flyScale2 = new Float32Array(this.flyPCount2);
    this.flyPCount3 = 10;
    this.flyPositions3 = new Float32Array(this.flyPCount3 * 3);
    this.flyScale3 = new Float32Array(this.flyPCount3);

    for (let i = 0; i < this.flyPCount1; i++) {
      this.flyPositions1[i * 3 + 0] = (Math.random() - 0.5) * 0.4;
      this.flyPositions1[i * 3 + 1] = (Math.random() + 5) * 0.4;
      this.flyPositions1[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      this.flyScale1[i] = Math.random() + 0.5;
    }
    for (let i = 0; i < this.flyPCount2; i++) {
      this.flyPositions2[i * 3 + 0] = (Math.random() - 0.5) * 0.4;
      this.flyPositions2[i * 3 + 1] = (Math.random() + 5) * 0.4;
      this.flyPositions2[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      this.flyScale2[i] = Math.random() + 0.5;
    }
    for (let i = 0; i < this.flyPCount3; i++) {
      this.flyPositions3[i * 3 + 0] = (Math.random() - 0.5) * 0.4;
      this.flyPositions3[i * 3 + 1] = (Math.random() + 5) * 0.4;
      this.flyPositions3[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      this.flyScale3[i] = Math.random() + 0.5;
    }

    this.flyParticlesGeometry1.setAttribute(
      "position",
      new THREE.BufferAttribute(this.flyPositions1, 3)
    );
    this.flyParticlesGeometry1.setAttribute(
      "aScale",
      new THREE.BufferAttribute(this.flyScale1, 1)
    );

    this.flyParticlesGeometry2.setAttribute(
      "position",
      new THREE.BufferAttribute(this.flyPositions2, 3)
    );
    this.flyParticlesGeometry2.setAttribute(
      "aScale",
      new THREE.BufferAttribute(this.flyScale2, 1)
    );

    this.flyParticlesGeometry3.setAttribute(
      "position",
      new THREE.BufferAttribute(this.flyPositions3, 3)
    );
    this.flyParticlesGeometry3.setAttribute(
      "aScale",
      new THREE.BufferAttribute(this.flyScale3, 1)
    );

    // Materials
    this.flyParticlesMaterial = new THREE.ShaderMaterial({
      vertexShader: flysVertexShader,
      fragmentShader: flysFragmentShader,
      uniforms: {
        uPixelRatio: { value: this.sizes.pixelRatio },
        uSize: { value: 300 },
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });

    // Points
    this.flyParticle1 = new THREE.Points(
      this.flyParticlesGeometry1,
      this.flyParticlesMaterial
    );
    this.flyParticle1.position.set(-13, 3, -5);

    this.flyParticle2 = new THREE.Points(
      this.flyParticlesGeometry2,
      this.flyParticlesMaterial
    );
    this.flyParticle2.position.set(-9, 0, 4);

    this.flyParticle3 = new THREE.Points(
      this.flyParticlesGeometry3,
      this.flyParticlesMaterial
    );
    this.flyParticle3.scale.set(2, 0.4, 2);
    this.flyParticle3.position.set(8, 0, -5);

    this.scene.add(this.flyParticle1, this.flyParticle2, this.flyParticle3);
  }

  resize() {
    this.flyParticlesMaterial.uniforms.uPixelRatio.value =
      this.sizes.pixelRatio;
  }

  update() {
    this.flyParticlesMaterial.uniforms.uTime.value = this.interval.elapse;

    // Animating the background particles
    this.backParticles.rotation.x = this.interval.elapse * 0.1;
    // this.backParticles.rotation.z = this.backParticles.rotation.x / 4;
  }
}
