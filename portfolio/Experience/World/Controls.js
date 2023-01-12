import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RectAreaLight } from "three";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.office = this.experience.world.office.actualOffice;
    this.office.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
    });
    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Desktop timeline
      "(min-width: 969px)": () => {
        console.log("desktop view");
        // Resets
        this.office.scale.set(0.11, 0.11, 0.11);
        this.rectLight.width = 0.5;
        this.rectLight.height = 0.7;

        // First Section (About Me)
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.office.position, {
          x: () => {
            return this.sizes.width * 0.0014;
          },
        });

        // Second Section (Projects)
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.secondMoveTimeline.to(
          this.office.position,
          {
            x: () => {
              return 1;
            },
            z: () => {
              return this.sizes.height * 0.0032;
            },
          },
          "same"
        );
        this.secondMoveTimeline.to(
          this.office.scale,
          {
            x: 0.3,
            y: 0.3,
            z: 0.3,
          },
          "same"
        );
        this.secondMoveTimeline.to(
          this.rectLight,
          {
            width: 0.8 * 3,
            height: 0.7 * 3,
          },
          "same"
        );

        // Third Section (Contact Me)
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
          y: 1.5,
          x: -4.1,
        });
      },

      // Mobile timeline
      "(max-width: 968px)": () => {
        console.log("mobile view");

        // Resets
        this.office.scale.set(0.07, 0.07, 0.07);
        this.office.position.set(0, 0, 0);
        this.rectLight.width = 0.3;
        this.rectLight.height = 0.3;

        // First Section (About Me)
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.office.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        });

        // Second Section (Projects)
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.office.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25,
            },
            "beep"
          )
          .to(
            this.rectLight,
            {
              width: 0.3 * 3.4,
              height: 0.4 * 3.4,
            },
            "beep"
          )
          .to(
            this.office.position,
            {
              x: 1.5,
            },
            "beep"
          );

        // Third Section (Contact Me)
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        // .to(this.office.position, {
        //     z: -4.8,
        //     // x: 2.2
        //     x: 2.2
        // })
        this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
          y: 1.5,
          x: -1.1,
        });
      },
      all: () => {
        // Porch animations
        console.log(this.office.children)
        this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "center center",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
        this.office.children.forEach(child => {
            if (child.name === "porch"){
                GSAP.to(child.position, {
                    x: 0,
                    z: 0,
                    duration: 0.3
                })
            }
        })
      },
    });
  }

  resize() {}

  update() {}
}
