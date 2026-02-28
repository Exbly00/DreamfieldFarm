AFRAME.registerComponent("feed-animal", {
  schema: {
    animalId: { type: "string", default: "" },
    animalType: { type: "string", default: "sheep" },
  },

  init: function () {
    this.fedRecently = false;

    // Configuration des cœurs par type d'animal
    this.heartConfig = {
      sheep: { y: 5.967, z: 3.198, scale: 0.002, offsetX: 0.5 },
      pig: { y: 25, z: 19, scale: 0.012, offsetX: 3 },
      cow: { y: 4, z: 2.1, scale: 0.0013, offsetX: 0.5 },
      chicken: { y: 10, z: 5, scale: 0.005, offsetX: 0.5 },
    };

    // Événement de clic - ne se déclenche que si pas grabbé
    this.el.addEventListener("click", (evt) => {
      // Ne pas nourrir si l'objet est actuellement grabbé
      const simpleGrab = this.el.components["simple-grab"];
      if (simpleGrab && simpleGrab.grabbedBy) {
        return; // Le sac est dans une main, ne pas nourrir
      }

      // Vérifier si on est en VR (le cursorEl est une main VR)
      const cursorEl = evt.detail?.cursorEl;
      const isVRHand =
        cursorEl &&
        (cursorEl.id === "hand-left" || cursorEl.id === "hand-right");

      // Si c'est en VR et que le sac vient d'être grabbé, ne pas nourrir
      if (isVRHand && simpleGrab && simpleGrab.grabbedBy) {
        return;
      }

      if (!this.fedRecently) {
        this.feedAnimal();
      }
    });
  },

  feedAnimal: function () {
    const animalEl = document.querySelector(`#${this.data.animalId}`);
    if (!animalEl) {
      console.warn(`Animal with ID ${this.data.animalId} not found`);
      return;
    }

    this.fedRecently = true;

    // 1. Si le sac était grabbé, le drop
    const simpleGrab = this.el.components["simple-grab"];
    if (simpleGrab && simpleGrab.grabbedBy) {
      const grabSystem = this.el.sceneEl.systems["simple-grab"];
      grabSystem.removeCurrentGrab(simpleGrab.grabbedBy, this.el, null);
      simpleGrab.grabbedBy = null;
    }

    // 2. Cacher le sac de nourriture
    this.el.setAttribute("visible", false);

    // 3. Sauvegarder la position complète de l'animal
    const animalPosition = animalEl.getAttribute("position");
    const originalPosition = {
      x: animalPosition.x,
      y: animalPosition.y,
      z: animalPosition.z,
    };

    // 4. Animation de saut de l'animal - montée puis descente
    animalEl.removeAttribute("animation__jump-up");
    animalEl.removeAttribute("animation__jump-down");

    animalEl.setAttribute("animation__jump-up", {
      property: "position",
      from: `${originalPosition.x} ${originalPosition.y} ${originalPosition.z}`,
      to: `${originalPosition.x} ${originalPosition.y + 0.3} ${originalPosition.z}`,
      dur: 300,
      easing: "easeOutQuad",
    });

    // Animation de descente après 300ms
    setTimeout(() => {
      animalEl.removeAttribute("animation__jump-up");

      animalEl.setAttribute("animation__jump-down", {
        property: "position",
        from: `${originalPosition.x} ${originalPosition.y + 0.3} ${originalPosition.z}`,
        to: `${originalPosition.x} ${originalPosition.y} ${originalPosition.z}`,
        dur: 300,
        easing: "easeInQuad",
      });

      // Nettoyer l'animation après qu'elle soit terminée
      setTimeout(() => {
        animalEl.removeAttribute("animation__jump-down");
      }, 320);
    }, 300);

    // 4. Créer les 3 cœurs au-dessus de l'animal (comme enfants)
    this.createHearts(animalEl);

    // 5. Réapparition de la nourriture après 1 seconde
    setTimeout(() => {
      this.el.setAttribute("visible", true);
      this.fedRecently = false;
    }, 1000);
  },

  createHearts: function (animalEl) {
    // Récupérer la config pour ce type d'animal
    const config =
      this.heartConfig[this.data.animalType] || this.heartConfig.sheep;

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const heart = document.createElement("a-entity");

        // Position RELATIVE avec décalage horizontal ajustable
        const offsetX = (Math.random() - 0.5) * config.offsetX;

        heart.setAttribute("position", `${offsetX} ${config.y} ${config.z}`);
        heart.setAttribute("gltf-model", "#heart-model");
        heart.setAttribute(
          "scale",
          `${config.scale} ${config.scale} ${config.scale}`,
        );
        heart.setAttribute("visible", true);

        // Animation de montée
        heart.setAttribute("animation__rise", {
          property: "position.y",
          from: config.y,
          to: config.y + 2,
          dur: 1500,
          easing: "easeOutQuad",
        });

        // Animation de fade
        heart.setAttribute("animation__fade", {
          property: "scale",
          to: "0.0001 0.0001 0.0001",
          dur: 1500,
          easing: "easeInQuad",
        });

        // Ajouter comme ENFANT de l'animal
        animalEl.appendChild(heart);

        // Supprimer après l'animation
        setTimeout(() => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
          }
        }, 1600);
      }, i * 200);
    }
  },
});
