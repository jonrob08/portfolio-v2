import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Office {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.office = this.resources.items.office
    this.actualOffice = this.office.scene

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };


  }

  resize() {}

  update() {
  }
}
