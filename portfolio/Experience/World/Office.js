import * as THREE from "three";
import Experience from "../Experience";

export default class Office {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.office = this.resources.items.office
    this.actualOffice = this.office.scene
    console.log(this.actualOffice)
  }

  resize() {}

  update() {}
}
