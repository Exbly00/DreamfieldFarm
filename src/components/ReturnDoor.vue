<template>
  <a-plane
    :position="position"
    :rotation="rotation"
    :scale="scale"
    color="red"
    opacity="0.5"
    clickable
    teleport-camera-rig="x: 12.749; y: 0; z: -11.382; rot: 0"
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
