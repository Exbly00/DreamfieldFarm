<script setup>
import { ref, onMounted } from "vue";
import TheCameraRig from "./TheCameraRig.vue";
import Animal from "./Animal.vue";
import TeleportPanel from "./TeleportPanel.vue";
import ReturnDoor from "./ReturnDoor.vue";
import FoodSphere from "./FoodSphere.vue";
import "../aframe/simple-grab.js";
import "../aframe/animal-feedable.js";
import "../aframe/grain-dispenser.js";
import "../aframe/duplicate-trees.js";

const allAssetsLoaded = ref(false);

const startAmbientSound = () => {
  const soundEl = document.querySelector("#ambient-sound");
  if (soundEl && soundEl.components.sound) {
    soundEl.components.sound.playSound();
  }
};

onMounted(() => {
  window.addEventListener("click", startAmbientSound, { once: true });
});
</script>

<template>
  <a-scene background="#89c4f4" stats>
    <a-assets @loaded="allAssetsLoaded = true">
      <img id="sky-texture" src="/assets/sky.jpg" />
      <img id="heart-texture" src="/assets/coeur.png" />
      <a-asset-item
        id="heart-model"
        src="assets/heart_emoji/scene.gltf"
      ></a-asset-item>
      <a-asset-item id="farm-model" src="assets/farm/farm.glb"></a-asset-item>
      <a-asset-item id="grain-model" src="assets/grain.glb"></a-asset-item>
      <a-asset-item
        id="carrot-model"
        src="assets/low_poly_carrot.glb"
      ></a-asset-item>

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
        id="bird-orange-model"
        src="assets/bird_orange.glb"
      ></a-asset-item>
      <a-asset-item
        id="alpaca-model"
        src="assets/low_poly_alpaca/scene.gltf"
      ></a-asset-item>
      <a-asset-item
        id="wood-sign-model"
        src="assets/stylized_wood_signs/scene.gltf"
      ></a-asset-item>
      <a-asset-item
        id="tree-model"
        src="assets/low_poly_tree.glb"
      ></a-asset-item>
      <a-asset-item
        id="tractor-model"
        src="assets/tractor_low_poly.glb"
      ></a-asset-item>
      <a-asset-item
        id="grass-model"
        src="assets/low_poly_grass.glb"
      ></a-asset-item>
      <a-asset-item
        id="pickup-truck-model"
        src="assets/farm_pickup_truck.glb"
      ></a-asset-item>
      <a-asset-item
        id="bucket-model"
        src="assets/low_poly_bucket.glb"
      ></a-asset-item>
      <a-asset-item
        id="fountain-model"
        src="assets/fountain.glb"
      ></a-asset-item>
      <a-asset-item
        id="treadmill-model"
        src="assets/treadmill_-_household_props_challenge_-_day_20.glb"
      ></a-asset-item>

      <!-- Sons -->
      <audio
        id="farm-ambience"
        src="/assets/574731__crattray1997__farm-ambience-2-4416.wav"
        preload="auto"
      ></audio>
      <audio
        id="sheep-bleat"
        src="/assets/321967__n_audioman__sheep_bleat.wav"
        preload="auto"
      ></audio>
      <audio
        id="pig-grunt"
        src="/assets/233177__jarredgibb__pig-grunt-and-squeal-4-96khz.wav"
        preload="auto"
      ></audio>
      <audio
        id="cow-moo"
        src="/assets/700380__manofham__moo-3-moo-moo-the-cow.mp3"
        preload="auto"
      ></audio>
      <audio
        id="chicken-cluck"
        src="/assets/724216__nickmaysoundmusic__chickens_waiting_to_be_fed_farm_light_wind_bird_song.wav"
        preload="auto"
      ></audio>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <a-sky src="#sky-texture"></a-sky>
      <!-- Son ambiant de ferme -->
      <a-entity
        id="ambient-sound"
        sound="src: #farm-ambience; loop: true; volume: 4"
      ></a-entity>

      <a-light type="ambient" color="#ffffff" intensity="0.6"></a-light>
      <a-light
        type="directional"
        color="#fff5e6"
        intensity="0.8"
        position="5 10 7"
        castShadow="true"
      ></a-light>

      <!-- World scale container: réduit tout de 20% sauf le camera-rig -->
      <a-entity id="world-scale" scale="0.8 0.8 0.8">
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
          shadow="cast: true; receive: 4tr4ue4"
        ></a-entity>

        <a-entity
          gltf-model="#tractor-model"
          position="8.879 0 -25.068"
          rotation="0 50.612 0"
          scale="0.25 0.25 0.25"
          shadow="cast: true; receive: true"
        ></a-entity>

        <a-entity
          gltf-model="#pickup-truck-model"
          position="21.137 0 -22.995"
          rotation="0 28.671 0"
          scale="1.3 1.3 1.3"
          shadow="cast: true; receive: true"
        ></a-entity>

        <a-entity
          gltf-model="#bucket-model"
          position="14.083 0 -24.967"
          rotation="0 0 0"
          scale="1 1 1"
          shadow="cast: true; receive: true"
        ></a-entity>

        <a-entity
          gltf-model="#fountain-model"
          position="21.116 0 -28.239"
          rotation="0 -180 0"
          scale="0.005 0.005 0.005"
          animation-mixer
          shadow="cast: true; receive: true"
        ></a-entity>

        <a-entity
          gltf-model="#treadmill-model"
          position="-1.490 0.213 -27.893"
          rotation="0 137.295 0"
          scale="1.5 1.5 1.5"
          shadow="cast: true; receive: true"
        ></a-entity>

        <a-entity
          gltf-model="#alpaca-model"
          position="-1.870 0.275 -28.310"
          rotation="0 42.386 0"
          scale="0.500 0.500 0.500"
          animation-mixer
          shadow="cast: true; receive: true"
        ></a-entity>

        <!-- Moutons -->
        <Animal
          id="sheep-1"
          type="sheep"
          position="5.485 0 0.580"
          rotation="0.000 -140.011 0.000"
          scale="0.243 0.243 0.243"
          :animated="true"
        />
        <FoodSphere
          animal-id="sheep-1"
          animal-type="sheep"
          position="5.461 -0.023 -0.433"
          scale="0.5 0.5 0.5"
        />
        <Animal
          id="sheep-2"
          type="sheep"
          position="8.936 0 -0.790"
          rotation="0.000 156.792 0.000"
          scale="0.243 0.243 0.243"
          :animated="true"
        />
        <FoodSphere
          animal-id="sheep-2"
          animal-type="sheep"
          position="11.422 0 -2.525"
          scale="0.5 0.5 0.5"
        />
        <TeleportPanel
          label="Moutons"
          position="0 -100 0"
          rotation="0 0 0"
          scale="0 0 0"
          text-position="12.936 1.237 -15.518"
          text-rotation="0 90 0"
          text-scale="0.510 0.500 0.300"
          :teleport-x="5.6"
          :teleport-y="0"
          :teleport-z="0"
          :teleport-rot="0"
        />
        <ReturnDoor
          position="4.993 0.924 -3.786"
          rotation="0 0 0"
          scale="1.700 1.600 1.000"
        />
        <!-- /Moutons -->

        <!-- Cochons -->
        <FoodSphere
          animal-id="pig-1"
          animal-type="pig"
          position="14.5 0 1.5"
          scale="0.5 0.5 0.5"
        />
        <Animal
          id="pig-1"
          type="pig"
          position="14.098 0 1.154"
          rotation="0 -144.677 0"
          scale="0.0405 0.0405 0.0405"
          :animated="true"
        />
        <Animal
          id="pig-2"
          type="pig"
          position="14.890 0 -2.075"
          rotation="0 138.989 0"
          scale="0.0405 0.0405 0.0405"
          :animated="true"
        />
        <FoodSphere
          animal-id="pig-2"
          animal-type="pig"
          position="14.5 0 -2.5"
          scale="0.5 0.5 0.5"
        />
        <Animal
          id="pig-3"
          type="pig"
          position="17.762 0 0.722"
          rotation="0 67.765 0"
          scale="0.0405 0.0405 0.0405"
          :animated="true"
        />
        <FoodSphere
          animal-id="pig-3"
          animal-type="pig"
          position="18 0 0.5"
          scale="0.5 0.5 0.5"
        />
        <TeleportPanel
          label="Cochons"
          position="12.852 -0.022 -14.270"
          rotation="0 90 0"
          scale="1.0 1.0 1.0"
          text-position="12.936 1.237 -12.917"
          text-rotation="0 90 0"
          text-scale="0.55 0.55 0.55"
          :teleport-x="12.8"
          :teleport-y="0"
          :teleport-z="0"
          :teleport-rot="0"
        />
        <ReturnDoor
          position="13.997 0.928 -3.716"
          rotation="0 0 0"
          scale="1.700 1.600 1.000"
        />
        <!-- /Cochons -->

        <!-- Vaches -->
        <Animal
          id="cow-1"
          type="cow"
          position="27.005 0 -2.062"
          rotation="0 -122.027 0"
          scale="0.3645 0.3645 0.3645"
          :animated="true"
        />
        <FoodSphere
          animal-id="cow-1"
          animal-type="cow"
          position="27 0 -3"
          scale="0.5 0.5 0.5"
        />
        <TeleportPanel
          label="Vaches"
          position="0 -100 0"
          rotation="0 0 0"
          scale="0 0 0"
          text-position="12.935 1.278 -14.281"
          text-rotation="0 90 0"
          text-scale="0.510 0.200 0.300"
          :teleport-x="20.8"
          :teleport-y="0"
          :teleport-z="0"
          :teleport-rot="0"
        />
        <ReturnDoor
          position="23.160 0.937 -3.604"
          rotation="0 0 0"
          scale="1.700 1.600 1.000"
        />
        <!-- /Vaches -->

        <!-- Poules -->
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
        <a-entity
          position="1.4 1 -11.5"
          sound="src: #chicken-cluck; autoplay: true; loop: true; volume: 2; positional: true; refDistance: 3; rolloffFactor: 2; distanceModel: exponential"
        ></a-entity>
        <TeleportPanel
          label="Poules"
          position="0 -100 0"
          rotation="0 0 0"
          scale="0 0 0"
          text-position="12.983 0.947 -14.251"
          text-rotation="0 90 0"
          text-scale="0.510 0.200 0.300"
          :teleport-x="0.8"
          :teleport-y="0"
          :teleport-z="-8.8"
          :teleport-rot="0"
        />
        <ReturnDoor
          position="4.101 0.890 -14.271"
          rotation="0 -90.000 0"
          scale="3.190 1.880 1"
        />
        <!-- /Poules -->

        <!-- Oiseaux oranges -->
        <Animal
          type="bird-orange"
          position="12.924 1.499 -15.276"
          rotation="0 76.433 0"
          scale="0.2 0.2 0.2"
          :animated="true"
        />
        <!-- /Oiseaux oranges -->

        <!-- Poules libres dans la ferme -->
        <Animal
          type="chicken"
          position="8 0 -22.839"
          rotation="0 45 0"
          scale="0.01 0.01 0.01"
          :animated="true"
        />
        <a-entity
          position="8 0.5 -22.839"
          sound="src: #chicken-cluck; autoplay: true; loop: true; volume: 0.5; positional: true; refDistance: 1.5; rolloffFactor: 2; distanceModel: exponential"
        ></a-entity>
        <Animal
          type="chicken"
          position="22.797 0 -11.290"
          rotation="0 -120 0"
          scale="0.01 0.01 0.01"
          :animated="true"
        />
        <a-entity
          position="22.797 0.5 -11.290"
          sound="src: #chicken-cluck; autoplay: true; loop: true; volume: 0.5; positional: true; refDistance: 1.5; rolloffFactor: 2; distanceModel: exponential"
        ></a-entity>

        <Animal
          type="chicken"
          position="6 0 -6.731"
          rotation="0 90 0"
          scale="0.01 0.01 0.01"
          :animated="true"
        />
        <a-entity
          position="6 0.5 -6.731"
          sound="src: #chicken-cluck; autoplay: true; loop: true; volume: 0.5; positional: true; refDistance: 1.5; rolloffFactor: 2; distanceModel: exponential"
        ></a-entity>

        <Animal
          type="chicken"
          position="12.902 0 -11.826"
          rotation="0 180 0"
          scale="0.01 0.01 0.01"
          :animated="true"
        />
        <a-entity
          position="12.902 0.5 -11.826"
          sound="src: #chicken-cluck; autoplay: true; loop: true; volume: 0.5; positional: true; refDistance: 1.5; rolloffFactor: 2; distanceModel: exponential"
        ></a-entity>
        <!-- /Poules libres -->
      </a-entity>

      <!-- Arbres avec duplicate-trees -->
      <a-entity
        gltf-model="#tree-model"
        position="0 0 0"
        scale="0.008 0.008 0.008"
        duplicate-trees="
          count: 200;
          areaSize: 80;
          scaleMin: 0.2;
          scaleMax: 1.5;
          forbiddenMinX: -11.72;
          forbiddenMaxX: 27.16;
          forbiddenMinZ: -32.73;
          forbiddenMaxZ: 4.27;
        "
      ></a-entity>

      <a-entity
        gltf-model="#grass-model"
        position="0 0 0"
        scale="0.5 0.5 0.5"
        duplicate-trees="
          count: 500;
          areaSize: 80;
          scaleMin: 0.8;
          scaleMax: 3;
          forbiddenMinX: 1000;
          forbiddenMaxX: 1001;
          forbiddenMinZ: 1000;
          forbiddenMaxZ: 1001;
        "
      ></a-entity>

      <!-- Visualisation zone interdite -->
      <a-plane
        position="7.72 0.028 -14.23"
        rotation="-90 0 0"
        width="48.6"
        height="transparent"
        material="opacity: 0.3; transparent: true"
      ></a-plane>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
