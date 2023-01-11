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
        "(min-width: 969px)": () => {
            console.log("desktop view")
            // First Section (About Me)
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            })
            this.firstMoveTimeline.to(this.office.position,{
                x: () => {
                    return this.sizes.width * 0.0014
                }
            })

            // Second Section (Projects)
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            })
            this.secondMoveTimeline.to(this.office.position,{
                x: () => {
                    return 1
                },
                z: () => {
                    return this.sizes.height * 0.0032
                }
            }, "same")
            this.secondMoveTimeline.to(this.office.scale,{
                x: 0.3,
                y: 0.3,
                z: 0.3
            }, "same")
        },  
        // Mobile timeline
        "(min-width: 968px)": () => {
            console.log("mobile view")
        },  
        "all": () => {
    
        }
          
      }); 
  }

  resize() {}

  update() {

  }
}
