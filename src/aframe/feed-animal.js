AFRAME.registerComponent("feed-animal", {
  schema: {
    animalId: { type: "string", default: "" },
  },

  init: function () {
    this.fedRecently = false;

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

      // Remettre explicitement la position d'origine après l'animation
      setTimeout(() => {
        animalEl.setAttribute("position", originalPosition);
        animalEl.removeAttribute("animation__jump-down");
      }, 320);
    }, 300);

    // 4. Créer les 3 cœurs au-dessus de l'animal (comme enfants)
    this.createHearts(animalEl);

    // 5. Réapparition de la nourriture après 5 secondes
    setTimeout(() => {
      this.el.setAttribute("visible", true);
      this.fedRecently = false;
    }, 3000);
  },

  createHearts: function (animalEl) {
    console.log("Creating hearts as children of animal");

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const heart = document.createElement("a-plane");

        // Position RELATIVE avec léger décalage horizontal
        const offsetX = (Math.random() - 0.5) * 0.5;
        const startY = 5.967; // Position y ajustée
        const startZ = 3.198; // Position z ajustée

        heart.setAttribute("position", `${offsetX} ${startY} ${startZ}`);
        heart.setAttribute("width", "0.6");
        heart.setAttribute("height", "0.6");
        heart.setAttribute("src", "#heart-texture");
        heart.setAttribute(
          "material",
          "opacity: 1; transparent: true; alphaTest: 0.5",
        );
        heart.setAttribute("visible", true);
        heart.setAttribute("billboard", ""); // Toujours face à la caméra

        // Animation de montée (RELATIVE)
        heart.setAttribute("animation__rise", {
          property: "position.y",
          from: startY,
          to: startY + 2,
          dur: 1500,
          easing: "easeOutQuad",
        });

        // Animation de fade out
        heart.setAttribute("animation__fade", {
          property: "material.opacity",
          from: 1,
          to: 0,
          dur: 1500,
          easing: "easeInQuad",
        });

        // Ajouter comme ENFANT de l'animal
        animalEl.appendChild(heart);
        console.log(`Heart ${i} added as child of animal`);

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
