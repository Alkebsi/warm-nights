import * as THREE from "three";
import SiteManager from "../SiteManager";
import vertexShader from "../Shaders/Grass/vertex.glsl";
import fragmentShader from "../Shaders/Grass/fragment.glsl";

export default class Grass {
  constructor(ball) {
    this.siteManager = new SiteManager();
    this.scene = this.siteManager.scene.instance;
    this.interval = this.siteManager.interval;
    this.tests = this.siteManager.tests;
    this.resources = this.siteManager.resources;
    this.hedgehog = ball;

    this.textureLoader = new THREE.TextureLoader(this.resources.loadingManager);

    this.setInstance();
    if (this.tests.active) {
      this.setTests();
    }
  }

  setInstance() {
    this.params = {
      PLANE_SIZE: 30,
      PLANE_WIDTH: 18,
      PLANE_HEIGHT: 28.5,
      BLADE_COUNT: 200000,
      BLADE_WIDTH: 0.1,
      BLADE_HEIGHT: 0.1,
      BLADE_HEIGHT_VARIATION: 0.26,
    };

    this.grassTexture = this.textureLoader.load("./textures/grass.jpg");

    // Grass Shader
    this.grassUniforms = {
      textures: { value: this.grassTexture },
      uTime: { value: 0 },
      uBallPos: { value: new THREE.Vector3(0, 0, 0) },
    };

    this.grassMaterial = new THREE.ShaderMaterial({
      uniforms: this.grassUniforms,
      vertexShader,
      fragmentShader,
      vertexColors: true,
      side: THREE.DoubleSide,
    });

    this.generateField();
  }

  generateField() {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.geom.dispose();
    }

    const positions = [];
    const uvs = [];
    const indices = [];
    const colors = [];

    for (let i = 0; i < this.params.BLADE_COUNT; i++) {
      const VERTEX_COUNT = 5;
      const surfaceMin = (this.params.PLANE_SIZE / 2) * -1;
      const surfaceMax = this.params.PLANE_SIZE / 2;
      const radius = this.params.PLANE_SIZE / 2;

      const x = (Math.random() - 0.77) * this.params.PLANE_WIDTH;
      const y = (Math.random() - 0.5) * this.params.PLANE_HEIGHT;

      const pos = new THREE.Vector3(x, 0, y);

      const uv = [
        this.convertRange(pos.x, surfaceMin, surfaceMax, 0, 1),
        this.convertRange(pos.z, surfaceMin, surfaceMax, 0, 1),
      ];

      const blade = this.generateBlade(pos, i * VERTEX_COUNT, uv);
      blade.verts.forEach((vert) => {
        positions.push(...vert.pos);
        uvs.push(...vert.uv);
        colors.push(...vert.color);
      });
      blade.indices.forEach((indice) => indices.push(indice));
    }

    this.geom = new THREE.BufferGeometry();
    this.geom.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    this.geom.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array(uvs), 2)
    );
    this.geom.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(colors), 3)
    );
    this.geom.setIndex(indices);
    // this.geom.computeVertexNormals(); // Probably deprecated
    // this.geom.computeFaceNormals(); // Probably deprecated

    this.mesh = new THREE.Mesh(this.geom, this.grassMaterial);
    this.mesh.position.set(0, 0, -3.8);
    this.mesh.scale.z = -1;
    this.mesh.rotation.y = Math.PI * 0.5;
    this.scene.add(this.mesh);
  }

  generateBlade(center, vArrOffset, uv) {
    const MID_WIDTH = this.params.BLADE_WIDTH * 0.5;
    const TIP_OFFSET = 0.1;
    const height =
      this.params.BLADE_HEIGHT +
      Math.random() * this.params.BLADE_HEIGHT_VARIATION;

    const yaw = Math.random() * Math.PI * 2;
    const yawUnitVec = new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw));
    const tipBend = Math.random() * Math.PI * 2;
    const tipBendUnitVec = new THREE.Vector3(
      Math.sin(tipBend),
      0,
      -Math.cos(tipBend)
    );

    // Find the Bottom Left, Bottom Right, Top Left, Top right, Top Center vertex positions
    const bl = new THREE.Vector3().addVectors(
      center,
      new THREE.Vector3()
        .copy(yawUnitVec)
        .multiplyScalar((this.params.BLADE_WIDTH / 2) * 1)
    );
    const br = new THREE.Vector3().addVectors(
      center,
      new THREE.Vector3()
        .copy(yawUnitVec)
        .multiplyScalar((this.params.BLADE_WIDTH / 2) * -1)
    );
    const tl = new THREE.Vector3().addVectors(
      center,
      new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * 1)
    );
    const tr = new THREE.Vector3().addVectors(
      center,
      new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * -1)
    );
    const tc = new THREE.Vector3().addVectors(
      center,
      new THREE.Vector3().copy(tipBendUnitVec).multiplyScalar(TIP_OFFSET)
    );

    tl.y += height / 2;
    tr.y += height / 2;
    tc.y += height;

    // Vertex Colors
    const black = [0, 0, 0];
    const gray = [0.5, 0.5, 0.5];
    const white = [1.0, 1.0, 1.0];

    const verts = [
      { pos: bl.toArray(), uv: uv, color: black },
      { pos: br.toArray(), uv: uv, color: black },
      { pos: tr.toArray(), uv: uv, color: gray },
      { pos: tl.toArray(), uv: uv, color: gray },
      { pos: tc.toArray(), uv: uv, color: white },
    ];

    const indices = [
      vArrOffset,
      vArrOffset + 1,
      vArrOffset + 2,
      vArrOffset + 2,
      vArrOffset + 4,
      vArrOffset + 3,
      vArrOffset + 3,
      vArrOffset,
      vArrOffset + 2,
    ];

    return { verts, indices };
  }

  convertRange(val, oldMin, oldMax, newMin, newMax) {
    return ((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
  }

  setTests() {
    this.tests.grass = this.tests.universe.addFolder("Grass");

    // PLANE_SIZE: 30,
    // BLADE_COUNT: 100000,
    // BLADE_WIDTH: 0.1,
    // BLADE_HEIGHT: 0.8,
    // BLADE_HEIGHT_VARIATION: 0.6

    this.tests.grass
      .add(this.params, "PLANE_SIZE", 0, 100, 1)
      .onFinishChange(() => {
        this.generateField();
      });
    this.tests.grass
      .add(this.params, "PLANE_WIDTH", 0, 100, 1)
      .onFinishChange(() => {
        this.generateField();
      });
    this.tests.grass
      .add(this.params, "PLANE_HEIGHT", 0, 100, 1)
      .onFinishChange(() => {
        this.generateField();
      });
    this.tests.grass
      .add(this.params, "BLADE_COUNT", 0, 400000, 100)
      .onFinishChange(() => {
        this.generateField();
      });
    this.tests.grass
      .add(this.params, "BLADE_WIDTH", 0, 1, 0.001)
      .onFinishChange(() => {
        this.generateField();
      });
    this.tests.grass
      .add(this.params, "BLADE_HEIGHT", 0, 5, 0.001)
      .onFinishChange(() => {
        this.generateField();
      });
    this.tests.grass
      .add(this.params, "BLADE_HEIGHT_VARIATION", 0, 5, 0.001)
      .onFinishChange(() => {
        this.generateField();
      });
  }

  update() {
    this.grassUniforms.uTime.value = this.interval.elapse;

    if (this.hedgehog.hedgehog) {
      this.grassUniforms.uBallPos.value = this.hedgehog.hedgehog.position;
    }
  }
}
