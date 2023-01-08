import * as THREE from "three";
import Experience from "../Experience";

export default class Office {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.office = this.resources.items.office
    this.actualOffice = this.office.scene

    this.setModel()
  }

  setModel(){
    this.actualOffice.children.forEach(child => {
      child.castShadow = true
      child.receiveShadow = true

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true
          groupChild.receiveShadow = true
        })
      }
    })

    this.scene.add(this.actualOffice)
    this.actualOffice.scale.set(0.11, 0.11, 0.11)
    
  }

  resize() {}

  update() {}
}
