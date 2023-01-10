import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { RectAreaLight } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"

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

    this.setModel()
    this.setAnimation()
    this.onMouseMove()
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

      if (child.name === "tanky"){
        child.material = new THREE.MeshPhysicalMaterial()
        child.material.roughness = 0
        child.material.color.set(0x549dd2)
        child.material.ior = 3
        child.material.transmission = 1
        child.material.opacity = 1
      }

      if (child.name === "Screen"){
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen
        })
      }

    })

    const width = 1
    const height = 1
    const intensity = 1
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    )
    rectLight.position.set(6.58127, 7, -3.3767)
    rectLight.rotation.x = -Math.PI / 2
    rectLight.rotation.z = -Math.PI / 4
    this.actualOffice.add(rectLight)

    const rectLightHelper = new RectAreaLightHelper(rectLight)
    // rectLight.add(rectLightHelper)

    this.scene.add(this.actualOffice)
    this.actualOffice.scale.set(0.11, 0.11, 0.11)
    
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualOffice)
    this.swim = this.mixer.clipAction(this.office.animations[0])
    console.log(this.office)
    this.swim.play()
  }

  onMouseMove(){
    window.addEventListener("mousemove", (e) => {
      // console.log(e)
      this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth
      this.lerp.target = this.rotation * 0.1
    })
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualOffice.rotation.y = this.lerp.current

    this.mixer.update(this.time.delta)
  }
}
