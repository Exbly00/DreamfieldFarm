<template>
  <a-plane
    :position="position"
    :rotation="rotation"
    :scale="scale"
    color="red"
    opacity="0.0"
    clickable
    teleport-camera-rig="x: 15.936; y: 0; z: -14.227; rot: 0"
  ></a-plane>
</template>

<script setup>
defineProps({
  position: {
    type: String,
    default: "0 1.5 0",
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
</script>
