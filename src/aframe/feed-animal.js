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
      pig: { y: 25, z: 19, scale: 0.012, offsetX: 0.5 },
      cow: { y: 4, z: 2, scale: 0.001, offsetX: 0.5 }, // Vaches (à ajuster)
      chicken: { y: 10, z: 5, scale: 0.005, offsetX: 0.5 }, // Poules (à ajuster)
    };

    // Événement de clic
    this.el.addEventListener("click", () => {
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

    // 1. Cacher la sphère de nourriture
    this.el.setAttribute("visible", false);

    // 2. Sauvegarder la position complète de l'animal
    const animalPosition = animalEl.getAttribute("position");
    const originalPosition = {
      x: animalPosition.x,
      y: animalPosition.y,
      z: animalPosition.z,
    };

    // 3. Animation de saut de l'animal - montée puis descente
    // Retirer les anciennes animations si elles existent
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
        // Ne pas utiliser setAttribute("position") car ça peut casser l'animation-mixer
        // L'animation a déjà remis l'animal à la bonne position
      }, 320);
    }, 300);

    // 4. Créer les 3 cœurs au-dessus de l'animal (comme enfants)
    this.createHearts(animalEl);

    // 5. Réapparition de la nourriture après 5 secondes
    setTimeout(() => {
      this.el.setAttribute("visible", true);
      this.fedRecently = false;
    }, 1000);
  },

  createHearts: function (animalEl) {
    // Récupérer la config pour ce type d'animal
    const config =
      this.heartConfig[this.data.animalType] || this.heartConfig.sheep;

    // console.log(`Creating hearts for ${this.data.animalType}:`, config);

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
