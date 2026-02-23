<script setup>
import { ref } from "vue";
import TheCameraRig from "./TheCameraRig.vue";

const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene background="color: #87CEEB">
    <!-- Assets -->
    <a-assets @loaded="allAssetsLoaded = true">
      <img id="sky-texture" src="/assets/sky.jpg" />
      <a-asset-item
        id="farm-model"
        src="assets/low_poly_farm_asset/scene.gltf"
      ></a-asset-item>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <!-- Ciel -->
      <a-sky src="#sky-texture"></a-sky>

      <!-- Lumières -->
      <a-light type="ambient" color="#ffffff" intensity="0.6"></a-light>
      <a-light
        type="directional"
        color="#fff5e6"
        intensity="0.8"
        position="5 10 7"
        castShadow="true"
      ></a-light>

      <!-- Sol d'herbe agrandi - 100x100m -->
      <a-plane
        position="0 0 0"
        rotation="-90 0 0"
        width="100"
        height="100"
        color="#5a8f4a"
        shadow="receive: true"
      ></a-plane>

      <!-- Ferme à échelle humaine -->
      <a-entity
        gltf-model="#farm-model"
        position="0 0 0"
        scale="4 4 4"
        shadow="cast: true; receive: true"
      ></a-entity>
    </template>

    <!-- Camera Rig -->
    <TheCameraRig />
  </a-scene>
</template>
