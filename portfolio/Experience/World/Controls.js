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

    this.setScrollTrigger()
  }

  setScrollTrigger(){
    ScrollTrigger.matchMedia({
        // Desktop timeline
        "(min-width: 969px)": function() {
            console.log("desktop view")
        },  
        // Mobile timeline
        "(min-width: 968px)": function() {
            console.log("mobile view")
        },  
        "all": function() {
    
        }
          
      }); 
  }

  resize() {}

  update() {

  }
}
