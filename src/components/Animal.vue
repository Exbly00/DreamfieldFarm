<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ["alpaca", "cow", "pig", "chicken"].includes(value),
  },
  position: {
    type: String,
    default: "0 0 0",
  },
  rotation: {
    type: String,
    default: "0 0 0",
  },
  scale: {
    type: String,
    default: "1 1 1",
  },
});

// Mapping des types d'animaux vers leurs modèles
const animalModelId = computed(() => `#${props.type}-model`);
</script>

<template>
  <a-entity>
    <!-- Modèle 3D de l'animal -->
    <a-entity
      :gltf-model="animalModelId"
      :position="position"
      :rotation="rotation"
      :scale="scale"
      shadow="cast: true; receive: true"
    ></a-entity>
  </a-entity>
</template>
