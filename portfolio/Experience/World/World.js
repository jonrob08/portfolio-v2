import * as THREE from "three";
import Experience from "../Experience";

import Office from "./Office";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources

    this.resources.on("ready", () => {
      this.office = new Office()
    })

  }

  resize() {

  }

  update() {

  }
}
