import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.office = this.experience.world.office.actualOffice
    GSAP.registerPlugin(ScrollTrigger)

    this.setPath()
  }

  setPath(){
    console.log(this.office)
    this.timeline = new GSAP.timeline()
    this.timeline.to(this.office.position, {
        x: 5,
        duration: 20,
    })
  }

  resize() {}

  update() {

  }
}
