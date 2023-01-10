import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap"

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene
    this.resources = this.experience.resources


    this.setSunlight()
  }

  setSunlight(){
    this.sunlight = new THREE.DirectionalLight("#ffffff", 3)
    this.sunlight.castShadow = true
    this.sunlight.shadow.camera.far = 20
    this.sunlight.shadow.mapSize.set(2048, 2048)
    this.sunlight.shadow.normalBias = 0.05
    this.sunlight.position.set(-1.5, 7, 3)
    this.scene.add(this.sunlight)

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1)
    this.scene.add(this.ambientLight)
  }

  switchTheme(theme){
    if(theme === "dark") {
        GSAP.to(this.sunlight.color, {
            r: 0 / 255,
            g: 0 / 255,
            b: 0 / 255,
        })
        GSAP.to(this.ambientLight.color, {
            r: 0 / 255,
            g: 0 / 255,
            b: 0 / 255,
        })
    } else {
        GSAP.to(this.sunlight.color, {
            r: 255 / 255,
            g: 255 / 255,
            b: 255 / 255,
        })
        GSAP.to(this.ambientLight.color, {
            r: 255 / 255,
            g: 255 / 255,
            b: 255 / 255,
        })
    }
  }

  resize() {}

  update() {}
}
