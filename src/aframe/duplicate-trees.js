import { getRandomFloat } from "../utils/math.js";

AFRAME.registerComponent("duplicate-trees", {
  schema: {
    count: { type: "number", default: 20 },
    areaSize: { type: "number", default: 50 },
    gltf: { type: "string", default: "" },
    scaleMin: { type: "number", default: 1 },
    scaleMax: { type: "number", default: 1 },
    // Zone interdite (rectangle)
    forbiddenMinX: { type: "number", default: -10 },
    forbiddenMaxX: { type: "number", default: 10 },
    forbiddenMinZ: { type: "number", default: -10 },
    forbiddenMaxZ: { type: "number", default: 10 },
  },

  init: function () {
    this.target = this.el;

    // Attendre que le modèle soit chargé (gltf-model est sur l'entité)
    this.target.addEventListener(
      "model-loaded",
      () => {
        this.calculateBoundingBox();
        this.createTreeInstances();
      },
      { once: true },
    );
  },

  calculateBoundingBox: function () {
    const box = new THREE.Box3().setFromObject(this.target.object3D);
    const size = new THREE.Vector3();
    box.getSize(size);
    this.width = size.x;
    this.depth = size.z;
  },

  isInForbiddenZone: function (x, z) {
    const { forbiddenMinX, forbiddenMaxX, forbiddenMinZ, forbiddenMaxZ } =
      this.data;
    return (
      x >= forbiddenMinX &&
      x <= forbiddenMaxX &&
      z >= forbiddenMinZ &&
      z <= forbiddenMaxZ
    );
  },

  generateValidPosition: function () {
    const { areaSize } = this.data;
    let x, z;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      x = getRandomFloat(-areaSize / 2, areaSize / 2);
      z = getRandomFloat(-areaSize / 2, areaSize / 2);
      attempts++;
    } while (this.isInForbiddenZone(x, z) && attempts < maxAttempts);

    if (attempts >= maxAttempts) {
      return null;
    }

    return { x, z };
  },

  createTreeInstances: function () {
    const { count, scaleMin, scaleMax } = this.data;

    const entityScale = this.el.object3D.scale;

    const positions = [];
    for (let i = 0; i < count; i++) {
      const pos = this.generateValidPosition();
      if (pos) {
        positions.push({
          x: pos.x,
          y: 0,
          z: pos.z,
          scale: getRandomFloat(scaleMin, scaleMax),
          rotation: getRandomFloat(0, Math.PI * 2),
        });
      }
    }

    const meshes = [];
    this.target.object3D.updateWorldMatrix(true, true);
    const invModelWorld = new THREE.Matrix4()
      .copy(this.target.object3D.matrixWorld)
      .invert();

    this.target.object3D.traverse((node) => {
      if (!node.isMesh) return;
      node.updateWorldMatrix(true, false);
      const relMatrix = new THREE.Matrix4().multiplyMatrices(
        invModelWorld,
        node.matrixWorld,
      );
      meshes.push({
        geometry: node.geometry,
        material: node.material,
        relMatrix,
      });
    });

    const dummy = new THREE.Object3D();
    const relPos = new THREE.Vector3();
    const relQuat = new THREE.Quaternion();
    const relScale = new THREE.Vector3();
    const group = new THREE.Group();

    meshes.forEach(({ geometry, material, relMatrix }) => {
      relMatrix.decompose(relPos, relQuat, relScale);
      const instancedMesh = new THREE.InstancedMesh(
        geometry,
        material,
        positions.length,
      );

      positions.forEach(({ x, y, z, scale, rotation }, i) => {
        dummy.position.set(x + relPos.x, y + relPos.y, z + relPos.z);
        dummy.rotation.set(0, rotation, 0);
        dummy.scale.set(
          relScale.x * scale * entityScale.x,
          relScale.y * scale * entityScale.y,
          relScale.z * scale * entityScale.z,
        );
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      });

      instancedMesh.instanceMatrix.needsUpdate = true;
      instancedMesh.frustumCulled = false;
      group.add(instancedMesh);
    });

    this.el.sceneEl.object3D.add(group);
  },
});
