<template>
  <a-sphere
    :position="position"
    :radius="radius"
    :color="color"
    clickable
    :feed-animal="`animalId: ${animalId}`"
  ></a-sphere>
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
  radius: {
    type: String,
    default: "0.2",
  },
  color: {
    type: String,
    default: "#8B4513", // Couleur marron pour la nourriture
  },
  animalId: {
    type: String,
    required: true,
  },
});
</script>
