// Component pour rendre les animaux clickables et détecter si on a des graines dans la main
AFRAME.registerComponent("animal-feedable", {
  init: function () {
    this.onClick = this.onClick.bind(this);
    this.el.addEventListener("click", this.onClick);

    // Configuration des cœurs par type d'animal
    this.heartConfig = {
      sheep: { y: 5.967, z: 3.198, scale: 0.002, offsetX: 0.5 },
      pig: { y: 25, z: 19, scale: 0.012, offsetX: 3 },
      cow: { y: 4, z: 2.1, scale: 0.0013, offsetX: 0.5 },
      chicken: { y: 10, z: 5, scale: 0.005, offsetX: 0.5 },
    };
  },

  onClick: function (evt) {
    const grabSystem = this.el.sceneEl.systems["simple-grab"];
    const hand = grabSystem.getHand(evt);
    if (!hand) return;

    const currentGrab = grabSystem.getCurrentGrab(hand);

    if (currentGrab && currentGrab.classList.contains("grain-handful")) {
      const animalId = currentGrab.getAttribute("data-animal-id");
      const animalType = currentGrab.getAttribute("data-animal-type");

      if (animalId === this.el.id) {
        this.feedAnimal(currentGrab, animalType);
      }
    }
  },

  feedAnimal: function (grainHandful, animalType) {
    const animalEl = this.el;
    const grabSystem = this.el.sceneEl.systems["simple-grab"];
    const grainGrabComp = grainHandful.components["simple-grab"];

    if (grainGrabComp && grainGrabComp.grabbedBy) {
      grabSystem.removeCurrentGrab(grainGrabComp.grabbedBy, grainHandful, null);
    }
    grainHandful.parentNode.removeChild(grainHandful);

    const animalPosition = animalEl.getAttribute("position");
    const originalPosition = {
      x: animalPosition.x,
      y: animalPosition.y,
      z: animalPosition.z,
    };

    animalEl.removeAttribute("animation__jump-up");
    animalEl.removeAttribute("animation__jump-down");

    animalEl.setAttribute("animation__jump-up", {
      property: "position",
      from: `${originalPosition.x} ${originalPosition.y} ${originalPosition.z}`,
      to: `${originalPosition.x} ${originalPosition.y + 0.3} ${originalPosition.z}`,
      dur: 300,
      easing: "easeOutQuad",
    });

    setTimeout(() => {
      animalEl.removeAttribute("animation__jump-up");

      animalEl.setAttribute("animation__jump-down", {
        property: "position",
        from: `${originalPosition.x} ${originalPosition.y + 0.3} ${originalPosition.z}`,
        to: `${originalPosition.x} ${originalPosition.y} ${originalPosition.z}`,
        dur: 300,
        easing: "easeInQuad",
      });

      setTimeout(() => {
        animalEl.removeAttribute("animation__jump-down");
      }, 320);
    }, 300);

    // Créer les cœurs
    this.createHearts(animalEl, animalType);
  },

  createHearts: function (animalEl, animalType) {
    const config = this.heartConfig[animalType] || this.heartConfig.sheep;

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const heart = document.createElement("a-entity");

        const offsetX = (Math.random() - 0.5) * config.offsetX;

        heart.setAttribute("position", `${offsetX} ${config.y} ${config.z}`);
        heart.setAttribute("gltf-model", "#heart-model");
        heart.setAttribute(
          "scale",
          `${config.scale} ${config.scale} ${config.scale}`,
        );
        heart.setAttribute("visible", true);

        heart.setAttribute("animation__rise", {
          property: "position.y",
          from: config.y,
          to: config.y + 2,
          dur: 1500,
          easing: "easeOutQuad",
        });

        heart.setAttribute("animation__fade", {
          property: "scale",
          to: "0.0001 0.0001 0.0001",
          dur: 1500,
          easing: "easeInQuad",
        });

        animalEl.appendChild(heart);

        setTimeout(() => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
          }
        }, 1500);
      }, i * 200);
    }
  },

  remove: function () {
    this.el.removeEventListener("click", this.onClick);
  },
});
