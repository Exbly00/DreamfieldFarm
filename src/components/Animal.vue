<script setup>
import { computed } from "vue";
import "../aframe/clickable.js";
import "../aframe/animal-feedable.js";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ["sheep", "cow", "pig", "chicken"].includes(value),
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
  animated: {
    type: Boolean,
    default: false,
  },
});

// Mapping des types d'animaux vers leurs modèles
const animalModelId = computed(() => `#${props.type}-model`);
</script>

<template>
  <a-entity
    :id="id"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    animal-feedable
  >
    <!-- Modèle 3D de l'animal avec animation-mixer -->
    <a-entity
      :gltf-model="animalModelId"
      :animation-mixer="animated ? 'clip: *' : ''"
      clickable
      shadow="cast: true; receive: true"
    ></a-entity>
  </a-entity>
</template>
