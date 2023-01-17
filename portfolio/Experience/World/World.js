import * as THREE from "three";
import Experience from "../Experience";

import Environment from "./Environment";
import Office from "./Office";
import Controls from "./Controls";
import Floor from "./Floor";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.theme = this.experience.theme

    this.resources.on("ready", () => {
      this.environment = new Environment()
      this.floor = new Floor()
      this.office = new Office()
      this.controls = new Controls()
    })

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme)
    })

  }

  switchTheme(theme){
    if(this.environment){
      this.environment.switchTheme(theme)
    }
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
