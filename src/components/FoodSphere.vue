<template>
  <a-entity
    :position="position"
    :scale="scale"
    :grain-dispenser="`animalId: ${animalId}; animalType: ${animalType}`"
  >
    <!-- Modèle GLTF du sac (toujours visible au sol) -->
    <a-entity gltf-model="#grain-model" clickable></a-entity>
  </a-entity>
</template>

<script setup>
import "../aframe/clickable.js";
import "../aframe/grain-dispenser.js";

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
