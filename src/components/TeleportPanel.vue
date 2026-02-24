<script setup>
import "../aframe/teleport-camera-rig.js";
import "../aframe/clickable.js";

const props = defineProps({
  position: {
    type: String,
    default: "0 1.5 -3",
  },
  rotation: {
    type: String,
    default: "0 0 0",
  },
  scale: {
    type: String,
    default: "1.0 1.0 1.0",
  },
  textPosition: {
    type: String,
    default: "0 1.5 -3",
  },
  textRotation: {
    type: String,
    default: "0 0 0",
  },
  textScale: {
    type: String,
    default: "0.55 0.55 0.55",
  },
  label: {
    type: String,
    required: true,
  },
  teleportX: {
    type: Number,
    required: true,
  },
  teleportY: {
    type: Number,
    default: 0,
  },
  teleportZ: {
    type: Number,
    required: true,
  },
  teleportRot: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    default: "#8B4513",
  },
});
</script>

<template>
  <a-entity>
    <!-- Panneau en bois -->
    <a-entity
      gltf-model="#wood-sign-model"
      :position="position"
      :rotation="rotation"
      :scale="scale"
      shadow="cast: true; receive: true"
    >
    </a-entity>

    <!-- Rectangle semi-transparent cliquable avec le texte cochons -->
    <a-plane
      :position="textPosition"
      :rotation="textRotation"
      :scale="textScale"
      width="2"
      height="1.5"
      :color="color"
      opacity="0"
      clickable
      :teleport-camera-rig="`x: ${teleportX}; y: ${teleportY}; z: ${teleportZ}; rot: ${teleportRot}`"
      shadow="cast: true; receive: true"
    >
    </a-plane>

    <!-- Texte sur le panneau (séparé pour éviter la déformation) -->
    <a-text
      :value="label"
      :position="textPosition"
      :rotation="textRotation"
      align="center"
      color="white"
      width="4"
    ></a-text>
  </a-entity>
</template>
