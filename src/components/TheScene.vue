<script setup>
import { ref } from "vue";
import TheCameraRig from "./TheCameraRig.vue";
import Animal from "./Animal.vue";
import TeleportPanel from "./TeleportPanel.vue";

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
      <a-asset-item
        id="wood-sign-model"
        src="assets/stylized_wood_signs/scene.gltf"
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
          position="5.485 0 0.580"
          rotation="0.000 -140.011 0.000"
          scale="0.30 0.30 0.30"
          :animated="true"
        />
        <Animal
          type="sheep"
          position="8.936 0 -0.790"
          rotation="0.000 156.792 0.000"
          scale="0.30 0.30 0.30"
          :animated="true"
        />

        <Animal
          type="pig"
          position="14.098 0 1.154"
          rotation="0 -144.677 0"
          scale="0.05 0.05 0.05"
          :animated="true"
        />
        <Animal
          type="pig"
          position="14.890 0 -2.075"
          rotation="0 138.989 0"
          scale="0.05 0.05 0.05"
          :animated="true"
        />

        <Animal
          type="pig"
          position="17.762 0 0.722"
          rotation="0 67.765 0"
          scale="0.05 0.05 0.05"
          :animated="true"
        />

        <Animal
          type="cow"
          position="27.005 0 -2.062"
          rotation="0 -122.027 0"
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

        <!-- Panneaux de téléportation -->
        <!-- cochons -->
        <TeleportPanel
          label="Cochons"
          position="12.852 -0.022 -14.270"
          rotation="0 90 0"
          scale="1.0 1.0 1.0"
          text-position="12.936 1.237 -12.917"
          text-rotation="0 90 0"
          text-scale="0.55 0.55 0.55"
          :teleport-x="16"
          :teleport-y="0"
          :teleport-z="0"
          :teleport-rot="0"
        />
        <!-- vache -->
        <TeleportPanel
          label="Vaches"
          position="0 -100 0"
          rotation="0 0 0"
          scale="0 0 0"
          text-position="12.935 1.278 -14.281"
          text-rotation="0 90 0"
          text-scale="0.510 0.200 0.300"
          :teleport-x="26"
          :teleport-y="0"
          :teleport-z="0"
          :teleport-rot="0"
        />
        <!-- poules -->
        <TeleportPanel
          label="Poules"
          position="0 -100 0"
          rotation="0 0 0"
          scale="0 0 0"
          text-position="12.983 0.947 -14.251"
          text-rotation="0 90 0"
          text-scale="0.510 0.200 0.300"
          :teleport-x="1"
          :teleport-y="0"
          :teleport-z="-11"
          :teleport-rot="0"
        />
        <!-- moutons -->
        <TeleportPanel
          label="Moutons"
          position="0 -100 0"
          rotation="0 0 0"
          scale="0 0 0"
          text-position="13.007 1.222 -15.518"
          text-rotation="0 90 0"
          text-scale="0.510 0.500 0.300"
          :teleport-x="7"
          :teleport-y="0"
          :teleport-z="0"
          :teleport-rot="0"
        />
      </a-entity>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
