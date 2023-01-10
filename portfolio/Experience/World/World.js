import * as THREE from "three";
import Experience from "../Experience";

import Environment from "./Environment";
import Office from "./Office";
import Controls from "./Controls";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources

    this.resources.on("ready", () => {
      this.environment = new Environment()
      this.office = new Office()
      this.controls = new Controls()
    })

  }

  resize() {

  }

  update() {
    if(this.office){
      this.office.update()
    }
    if(this.controls){
      this.controls.update()
    }
  }
}
