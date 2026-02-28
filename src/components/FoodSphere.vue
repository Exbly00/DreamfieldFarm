<template>
  <a-entity
    :position="position"
    :scale="scale"
    gltf-model="#grain-model"
    clickable
    simple-grab
    :feed-animal="`animalId: ${animalId}; animalType: ${animalType}`"
  >
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
