<script setup>
import { ref } from "vue";

defineProps({
  loaded: Boolean,
});

const showOnboarding = ref(true);

function enterScene() {
  showOnboarding.value = false;
  if (
    AFRAME.utils.device.checkHeadsetConnected() &&
    !AFRAME.utils.device.isMobile()
  ) {
    document.querySelector("a-scene").enterVR();
  }
  document.querySelector("a-scene").emit("enter-scene");
}
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">
    <div class="content">
      <h1>🌽 DREAMFIELD FARM 🚜</h1>
      <p class="subtitle">An immersive VR farm experience</p>
      <p v-if="!loaded" class="loading">Loading assets...</p>
      <button v-if="loaded" @click="enterScene()" class="enter-btn">
        Enter Farm
      </button>

      <div class="info-sections">
        <section class="controls">
          <h2>🎮 How to play</h2>
          <div class="control-mode">
            <h3>💻 Desktop mode</h3>
            <ul>
              <li><strong>WASD / Arrow keys</strong> - Move around</li>
              <li><strong>Mouse drag</strong> - Look around</li>
              <li>
                <strong>Click</strong> - Interact with grain bags and animals
              </li>
            </ul>
          </div>
          <div class="control-mode">
            <h3>🥽 VR mode</h3>
            <ul>
              <li><strong>Physical walking</strong> - Move naturally</li>
              <li><strong>Joystick/Touchpad</strong> - Blink teleportation</li>
              <li>
                <strong>Teleport panels</strong> - Jump between animal
                enclosures
              </li>
              <li><strong>Grip buttons</strong> - Grab grains from bags</li>
              <li><strong>Touch animals</strong> - Feed them with grains</li>
            </ul>
          </div>
        </section>

        <section class="credits">
          <h2>🎨 3D assets credits</h2>
          <p class="credit-source">
            All models from
            <a href="https://sketchfab.com" target="_blank">Sketchfab.com</a>
          </p>
          <div class="credit-grid">
            <div class="credit-item">
              <strong>Farm asset</strong> -
              <a
                href="https://sketchfab.com/3d-models/low-poly-farm-asset-1a6da767bc97442a8dd1d9e4c40f1a86"
                target="_blank"
                >Igor_Petrov</a
              >
              (CC BY)
            </div>
            <div class="credit-item">
              <strong>Cow</strong> -
              <a
                href="https://sketchfab.com/3d-models/cow-3c1bbce7a64640cca28b49b3d181e347"
                target="_blank"
                >kenchoo</a
              >
              (Free Standard)
            </div>
            <div class="credit-item">
              <strong>Sheep</strong> -
              <a
                href="https://sketchfab.com/3d-models/sheep-08b05ae799d947f1a68c49b2d661eb53"
                target="_blank"
                >kenchoo</a
              >
              (CC BY)
            </div>
            <div class="credit-item">
              <strong>Alpaca</strong> -
              <a
                href="https://sketchfab.com/3d-models/low-poly-alpaca-6fff35b671464bea80baae4f53111aae"
                target="_blank"
                >kenchoo</a
              >
              (Free Standard)
            </div>
            <div class="credit-item">
              <strong>Pig</strong> -
              <a
                href="https://sketchfab.com/3d-models/pig-83358848ab0b4b7c8cbbe9d6b0860468"
                target="_blank"
                >Nicole Harris</a
              >
              (CC BY)
            </div>
            <div class="credit-item">
              <strong>Chicken</strong> -
              <a
                href="https://sketchfab.com/3d-models/cartoon-chicken-465519acf2ad43209055b3b6e8787849"
                target="_blank"
                >BaraV</a
              >
              (CC BY)
            </div>
            <div class="credit-item">
              <strong>Market assets</strong> -
              <a
                href="https://sketchfab.com/3d-models/medieval-market-asset-pack-006ffc4ac5f34a1782f567b07e6605f2"
                target="_blank"
                >vmatthew</a
              >
              (CC BY)
            </div>
            <div class="credit-item">
              <strong>Heart emoji</strong> -
              <a
                href="https://sketchfab.com/3d-models/heart-emoji-ee06846511314b96981313971236e188"
                target="_blank"
                >assetfactory</a
              >
              (Free Standard)
            </div>
            <div class="credit-item">
              <strong>Tree</strong> -
              <a
                href="https://sketchfab.com/3d-models/low-poly-tree-70f0e767fc2f449fa6fef9c2308b395f"
                target="_blank"
                >Chenuka Wijesundara</a
              >
              (CC BY)
            </div>
            <div class="credit-item">
              <strong>Orange bird</strong> -
              <a
                href="https://sketchfab.com/3d-models/bird-orange-0d31748606c2499fb652c0c1052b7cfa"
                target="_blank"
                >Wen Yeh</a
              >
              (CC BY-NC-SA)
            </div>
            <div class="credit-item">
              <strong>Tractor</strong> -
              <a
                href="https://sketchfab.com/3d-models/tractor-low-poly-6a585922ed344639824958d82d15d0f5"
                target="_blank"
                >bhagathgoud</a
              >
              (CC BY)
            </div>
            <div class="credit-item">
              <strong>Grass</strong> -
              <a
                href="https://sketchfab.com/3d-models/low-poly-grass-c7b3cadd101245d899ca49fa587b2745"
                target="_blank"
                >Natural_Disbuster</a
              >
              (CC BY)
            </div>
            <div class="credit-item">
              <strong>Pickup truck</strong> -
              <a
                href="https://sketchfab.com/3d-models/farm-pickup-truck-5615b16ba2e24f7ab6cd26eda7946ae8"
                target="_blank"
                >Nekitron</a
              >
              (CC BY)
            </div>
            <div class="credit-item">
              <strong>Bucket</strong> -
              <a
                href="https://sketchfab.com/3d-models/low-poly-bucket-beb034c72a3f4a72aad127e1c7aef257"
                target="_blank"
                >Stacy</a
              >
              (Free Standard)
            </div>
            <div class="credit-item">
              <strong>Fountain</strong> -
              <a
                href="https://sketchfab.com/3d-models/fountain-e6370546c6204bf3bdde275113956585"
                target="_blank"
                >Fabi_G</a
              >
              (CC BY)
            </div>
            <div class="credit-item">
              <strong>Treadmill</strong> -
              <a
                href="https://sketchfab.com/3d-models/treadmill-household-props-challenge-day-20-cdb3a9f5c21f40d8bb4bd938edbac826"
                target="_blank"
                >Pixel-bit</a
              >
              (CC BY)
            </div>
          </div>
        </section>

        <section class="credits">
          <h2>🔊 Sound credits</h2>
          <p class="credit-source">
            All sounds from
            <a href="https://freesound.org" target="_blank">Freesound.org</a>
          </p>
          <div class="credit-grid">
            <div class="credit-item">
              <a href="https://freesound.org/s/233177/" target="_blank"
                >JarredGibb</a
              >
              - CC0
            </div>
            <div class="credit-item">
              <a href="https://freesound.org/s/700380/" target="_blank"
                >manofham</a
              >
              - CC0
            </div>
            <div class="credit-item">
              <a href="https://freesound.org/s/724216/" target="_blank"
                >nickmaysoundmusic</a
              >
              - CC0
            </div>
            <div class="credit-item">
              <a href="https://freesound.org/s/321967/" target="_blank"
                >n_audioman</a
              >
              - CC BY 4.0
            </div>
            <div class="credit-item">
              <a href="https://freesound.org/s/574731/" target="_blank"
                >crattray1997</a
              >
              - CC BY 4.0
            </div>
          </div>
        </section>

        <section class="credits">
          <h2>📚 Code & libraries</h2>
          <div class="credit-grid">
            <div class="credit-item">
              <a href="https://github.com/c-frame/aframe-extras" target="_blank"
                >aframe-extras</a
              >
              - MIT License
            </div>
            <div class="credit-item">
              <a href="https://github.com/c-frame/physx" target="_blank"
                >aframe physx</a
              >
              - MIT License
            </div>
            <div class="credit-item">
              <a
                href="https://github.com/jure/aframe-blink-controls/"
                target="_blank"
                >aframe-blink-controls</a
              >
              - MIT License
            </div>
            <div class="credit-item">
              <a
                href="https://github.com/diarmidmackenzie/aframe-multi-camera/"
                target="_blank"
                >aframe-multi-camera</a
              >
              - MIT License
            </div>
            <div class="credit-item">
              <a
                href="https://github.com/AdaRoseCannon/aframe-xr-boilerplate"
                target="_blank"
                >simple-navmesh-constraint</a
              >
              - Ada Rose Cannon (MIT)
            </div>
          </div>
          <p class="source-code">
            <a href="https://github.com/Exbly00/DreamfieldFarm" target="_blank"
              >📂 View Source Code on GitHub</a
            >
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
#onboarding {
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #0a3d0c 0%, #1a5d1a 100%);
  color: #f0f0f0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  z-index: 10000;
  overflow-y: auto;
  overflow-x: hidden;
}

.content {
  margin: 0 auto;
  max-width: 900px;
  padding: 2rem 1.5rem;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin: 1rem 0 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.8s ease-in;
}

.subtitle {
  font-size: 1.2rem;
  color: #c8e6c9;
  margin-bottom: 1.5rem;
}

.loading {
  font-size: 1.1rem;
  color: #fff9c4;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.enter-btn {
  font-size: 1.5rem;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  background: linear-gradient(45deg, #4caf50, #66bb6a);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  margin: 1.5rem 0;
}

.enter-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.info-sections {
  margin-top: 1.5rem;
  text-align: left;
}

section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #c8e6c9;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 0.5rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.control-mode {
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 10px;
}

h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: #fff9c4;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  padding: 0.5rem 0;
  font-size: 1rem;
  line-height: 1.6;
}

li strong {
  color: #81c784;
}

.credit-source {
  font-size: 1rem;
  margin-bottom: 1rem;
  font-style: italic;
  color: #c8e6c9;
}

.credit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.8rem;
}

.credit-item {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.7rem;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.credit-item:hover {
  background: rgba(76, 175, 80, 0.2);
  transform: translateX(5px);
}

.source-code {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 1.1rem;
}

a {
  color: #81c784;
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #c8e6c9;
  text-decoration: underline;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .enter-btn {
    font-size: 1.2rem;
    padding: 0.8rem 2rem;
  }

  .content {
    padding: 1rem;
  }

  .credit-grid {
    grid-template-columns: 1fr;
  }
}
</style>
