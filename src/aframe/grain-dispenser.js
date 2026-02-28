// Component qui distribue des graines dans la main quand on clique sur le sac
AFRAME.registerComponent("grain-dispenser", {
  schema: {
    animalId: { type: "string", default: "" },
    animalType: { type: "string", default: "sheep" },
  },

  init: function () {
    this.onClick = this.onClick.bind(this);
    this.el.addEventListener("click", this.onClick);
  },

  onClick: function (evt) {
    const grabSystem = this.el.sceneEl.systems["simple-grab"];
    const hand = grabSystem.getHand(evt);
    if (!hand) return;

    // Vérifier si la main a déjà des graines
    const currentGrab = grabSystem.getCurrentGrab(hand);
    if (currentGrab) return;

    // Créer une poignée de graines
    this.createGrainHandful(hand);
  },

  createGrainHandful: function (hand) {
    const grainHandful = document.createElement("a-entity");
    grainHandful.setAttribute("class", "grain-handful");
    grainHandful.setAttribute("simple-grab", "");
    grainHandful.setAttribute("scale", "0.15 0.15 0.15");
    grainHandful.setAttribute("data-animal-id", this.data.animalId);
    grainHandful.setAttribute("data-animal-type", this.data.animalType);

    // Créer les 6 sphères de graines avec différentes tailles et couleurs
    const spheresData = [
      { radius: 0.25, color: "#FFD700", position: "0 0 0" },
      { radius: 0.22, color: "#FFC700", position: "-0.28 -0.08 0.06" },
      { radius: 0.22, color: "#FFB700", position: "0.28 0.1 -0.04" },
      { radius: 0.2, color: "#FFD700", position: "0.06 0.26 0.15" },
      { radius: 0.2, color: "#FFC700", position: "-0.12 -0.22 -0.1" },
      { radius: 0.2, color: "#FFB700", position: "0.22 -0.16 0.22" },
    ];

    spheresData.forEach((data) => {
      const sphere = document.createElement("a-sphere");
      sphere.setAttribute("radius", data.radius);
      sphere.setAttribute("color", data.color);
      sphere.setAttribute("position", data.position);
      grainHandful.appendChild(sphere);
    });

    this.el.sceneEl.appendChild(grainHandful);
    grainHandful.object3D.position.copy(hand.object3D.position);

    // Auto-grabber après un court délai
    setTimeout(() => {
      const grabSystem = this.el.sceneEl.systems["simple-grab"];
      const grainGrabComp = grainHandful.components["simple-grab"];
      if (grainGrabComp) {
        grainGrabComp.grabbedBy = hand;
        grabSystem.setCurrentGrab(hand, grainHandful);
      }
    }, 50);
  },

  remove: function () {
    this.el.removeEventListener("click", this.onClick);
  },
});
