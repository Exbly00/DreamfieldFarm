<script setup>
import { ref } from "vue";
import TheCameraRig from "./TheCameraRig.vue";
import Animal from "./Animal.vue";

const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene background="color: #87CEEB">
    <a-assets @loaded="allAssetsLoaded = true">
      <img id="sky-texture" src="/assets/sky.jpg" />
      <a-asset-item id="farm-model" src="assets/farm/farm.glb"></a-asset-item>
      <!-- Assets des animaux -->
      <a-asset-item
        id="sheep-model"
        src="assets/sheep/scene.gltf"
      ></a-asset-item>
      <a-asset-item id="pig-model" src="assets/pig/scene.gltf"></a-asset-item>
      <a-asset-item id="cow-model" src="assets/cow/scene.gltf"></a-asset-item>
      <a-asset-item
        id="chicken-model"
        src="assets/cartoon_chicken/scene.gltf"
      ></a-asset-item>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <a-sky src="#sky-texture"></a-sky>

      <a-light type="ambient" color="#ffffff" intensity="0.6"></a-light>
      <a-light
        type="directional"
        color="#fff5e6"
        intensity="0.8"
        position="5 10 7"
        castShadow="true"
      ></a-light>

      <a-entity>
        <a-plane
          position="0 0 0"
          rotation="-90 0 0"
          width="100"
          height="100"
          color="#5a8f4a"
          shadow="receive: true"
        ></a-plane>

        <a-entity
          gltf-model="#farm-model"
          position="0 0 0"
          scale="4 4 4"
          shadow="cast: true; receive: true"
        ></a-entity>

        <!-- Animaux -->
        <Animal
          type="sheep"
          position="7.960 0 0.526"
          rotation="0.000 151.617 0.000"
          scale="0.3 0.3 0.3"
          :animated="true"
        />
        <Animal
          type="sheep"
          position="5.726 0 -0.790"
          rotation="0.000 -163.672 0.000"
          scale="0.3 0.3 0.3"
          :animated="true"
        />

        <Animal
          type="pig"
          position="16.996 0 -1.025"
          rotation="0 -45 0"
          scale="0.05 0.05 0.05"
          :animated="true"
        />
        <Animal
          type="pig"
          position="16.996 0 0.941"
          rotation="0 -45 0"
          scale="0.05 0.05 0.05"
          :animated="true"
        />

        <Animal
          type="pig"
          position="14.890 0 -0.339"
          rotation="0 172.965 0"
          scale="0.05 0.05 0.05"
          :animated="true"
        />

        <Animal
          type="cow"
          position="25.919 0 -0.866"
          rotation="0 147.107 0"
          scale="0.45 0.45 0.45"
          :animated="true"
        />

        <Animal
          type="chicken"
          position="1.466 0 -11.917"
          rotation="0 0 0"
          scale="0.01 0.01 0.01"
          :animated="true"
        />
        <Animal
          type="chicken"
          position="3.048 0 -11.917"
          rotation="0 -114.691 0"
          scale="0.01 0.01 0.01"
          :animated="true"
        />
        <Animal
          type="chicken"
          position="-0.306 0 -10.808"
          rotation="0 62.719 0"
          scale="0.01 0.01 0.01"
          :animated="true"
        />
      </a-entity>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
