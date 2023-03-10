import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap"
import GUI from "lil-gui"

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // this.gui = new GUI({ container: document.querySelector('.hero-main') })
    this.obj = {
        colorObj: {
            r: 0,
            g: 0,
            b: 0
       },
       intensity: 3,
    }

    this.setSunlight()
    // this.setGUI()
  }

  setGUI(){
    this.gui.addColor(this.obj, "colorObj").onChange(() => {
        this.sunlight.color.copy(this.obj.colorObj)
        this.ambientLight.color.copy(this.obj.colorObj)
    })
    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
        this.sunlight.intensity = this.obj.intensity
        this.ambientLight.intensity = this.obj.intensity
    })
  }

  setSunlight(){
    this.sunlight = new THREE.DirectionalLight("#ffffff", 3)
    this.sunlight.castShadow = true
    this.sunlight.shadow.camera.far = 20
    this.sunlight.shadow.mapSize.set(2048, 2048)
    this.sunlight.shadow.normalBias = 0.05
    this.sunlight.position.set(-1.5, 7, 3)
    this.scene.add(this.sunlight)
    console.log(this.sunlight)

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1)
    this.scene.add(this.ambientLight)
  }

  switchTheme(theme){
    if(theme === "dark") {
        GSAP.to(this.sunlight.color, {
            r: 0.17254901960784313,
            g: 0.23137254901960785,
            b: 0.6862745098039216,
        })
        GSAP.to(this.ambientLight.color, {
            r: 0.17254901960784313,
            g: 0.23137254901960785,
            b: 0.6862745098039216,
        })
        GSAP.to(this.sunlight, {
            intensity: 0.90
        })
        GSAP.to(this.ambientLight, {
            intensity: 0.90
        })
    } else {
        GSAP.to(this.sunlight.color, {
            r: 1,
            g: 1,
            b: 1,
        })
        GSAP.to(this.ambientLight.color, {
            r: .4,
            g: .4,
            b: .4,
        })
        GSAP.to(this.sunlight, {
            intensity: 3
        })
        GSAP.to(this.ambientLight, {
            intensity: 3
        })
    }
  }

  resize() {}

  update() {}
}
