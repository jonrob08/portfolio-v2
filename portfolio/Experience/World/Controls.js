import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes
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
        x: () => {
            return this.sizes.width * 0.0012
        },
        scrollTrigger: {
            trigger: ".first-move",
            markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
        }
    })
  }

  resize() {}

  update() {

  }
}
