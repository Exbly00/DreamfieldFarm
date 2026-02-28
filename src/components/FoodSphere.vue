<template>
  <a-entity
    :position="position"
    :scale="scale"
    simple-grab
    :feed-animal="`animalId: ${animalId}; animalType: ${animalType}`"
  >
    <!-- Modèle GLTF du sac (visible au sol) -->
    <a-entity
      gltf-model="#grain-model"
      class="grain-bag-model"
      clickable
    ></a-entity>

    <!-- Groupe de sphères jaunes (visible dans la main) -->
    <a-entity class="grain-sphere" visible="false">
      <!-- Groupe de sphères formant un tas de grains -->
      <a-sphere
        radius="0.25"
        color="#FFD700"
        position="0 0 0"
        clickable
      ></a-sphere>
      <a-sphere
        radius="0.22"
        color="#FFC700"
        position="-0.28 -0.08 0.06"
        clickable
      ></a-sphere>
      <a-sphere
        radius="0.22"
        color="#FFB700"
        position="0.28 0.1 -0.04"
        clickable
      ></a-sphere>
      <a-sphere
        radius="0.2"
        color="#FFD700"
        position="0.06 0.26 0.15"
        clickable
      ></a-sphere>
      <a-sphere
        radius="0.2"
        color="#FFC700"
        position="-0.12 -0.22 -0.1"
        clickable
      ></a-sphere>
      <a-sphere
        radius="0.2"
        color="#FFB700"
        position="0.22 -0.16 0.22"
        clickable
      ></a-sphere>
    </a-entity>
  </a-entity>
</template>

<script setup>
import "../aframe/clickable.js";
import "../aframe/feed-animal.js";
import "../aframe/look-at.js";

defineProps({
  position: {
    type: String,
    default: "0 0.3 0",
  },
  scale: {
    type: String,
    default: "1 1 1",
  },
  animalId: {
    type: String,
    required: true,
  },
  animalType: {
    type: String,
    required: true,
  },
});
</script>
