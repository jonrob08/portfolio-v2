import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RectAreaLight } from "three";
import ASScroll from "@ashthornton/asscroll";

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

    this.setSmoothScroll();
    this.setScrollTrigger();
  }

  setSmoothScroll(){
    
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
        // console.log("fired mobile");

        // Resets
        this.office.scale.set(0.07, 0.07, 0.07);
        this.office.position.set(0, 0, 0);
        this.rectLight.width = 0.3;
        this.rectLight.height = 0.4;
        this.camera.orthographicCamera.position.set(0, 6.5, 10);

        // First Section (About Me)
        this.firstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
                trigger: ".first-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                // invalidateOnRefresh: true,
            },
        }).to(this.office.scale, {
            x: 0.1,
            y: 0.1,
            z: 0.1,
        },
        "same");

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
                "same"
            )
            .to(
                this.rectLight,
                {
                    width: 0.3 * 3.4,
                    height: 0.4 * 3.4,
                },
                "same"
            )
            .to(
                this.office.position,
                {
                    x: 1.5,
                },
                "same"
            );

        // Third section (Contact Me)
        this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
                trigger: ".third-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            },
        })
        .to(this.office.scale, {
                x: 0.1,
                y: 0.1,
                z: 0.1,
        },
        "same")
        // .to(this.office.position, {
        //     z: -2.5,
        //     x: 1.9
        // },
        // "same");
    },
      all: () => {
        // Section's progress bar
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
            this.progressWrapper =
                section.querySelector(".progress-wrapper");
            this.progressBar = section.querySelector(".progress-bar");

            if (section.classList.contains("right")) {
                GSAP.to(section, {
                    borderTopLeftRadius: 10,
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top top",
                        scrub: 0.6,
                    },
                });
                GSAP.to(section, {
                    borderBottomLeftRadius: 700,
                    scrollTrigger: {
                        trigger: section,
                        start: "bottom bottom",
                        end: "bottom top",
                        scrub: 0.6,
                    },
                });
            } else {
                GSAP.to(section, {
                    borderTopRightRadius: 10,
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top top",
                        scrub: 0.6,
                    },
                });
                GSAP.to(section, {
                    borderBottomRightRadius: 700,
                    scrollTrigger: {
                        trigger: section,
                        start: "bottom bottom",
                        end: "bottom top",
                        scrub: 0.6,
                    },
                });
            }
            GSAP.from(this.progressBar, {
                scaleY: 0,
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.4,
                    pin: this.progressWrapper,
                    pinSpacing: false,
                },
            });
        });
        // Porch animations
        console.log(this.office.children);
        this.outsideTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "center center",
          },
        });
        // Porch
        this.office.children.forEach((child) => {
          if (child.name === "porch") {
            this.first = GSAP.to(child.position, {
              x: 0,
              z: 0,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });
        // Mailbox
        this.office.children.forEach((child) => {
          if (child.name === "Mailbox") {
            this.second = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });
        // Flower 1
        this.office.children.forEach((child) => {
          if (child.name === "flower_1") {
            this.eigth = GSAP.to(child.scale, {
              x: 0.1,
              y: 0.1,
              z: 0.1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });
        // Flower 2
        this.office.children.forEach((child) => {
          if (child.name === "flower_2") {
            this.ninth = GSAP.to(child.scale, {
              x: 0.13,
              y: 0.13,
              z: 0.13,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });
        // Lamp
        this.office.children.forEach((child) => {
          if (child.name === "lamp_outside") {
            this.third = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });
        // Stone 1
        this.office.children.forEach((child) => {
          if (child.name === "step_stone_1") {
            this.fourth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });
        // Stone 2
        this.office.children.forEach((child) => {
          if (child.name === "step_stone_2") {
            this.fifth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });
        // Stone 3
        this.office.children.forEach((child) => {
          if (child.name === "step_stone_3") {
            this.sixth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });
        // Dirt
        this.office.children.forEach((child) => {
          if (child.name === "dirt") {
            this.seventh = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });

        this.outsideTimeline.add(this.first)
        this.outsideTimeline.add(this.second)
        this.outsideTimeline.add(this.third)
        this.outsideTimeline.add(this.fourth, "-=0.2")
        this.outsideTimeline.add(this.fifth, "-=0.2")
        this.outsideTimeline.add(this.sixth, "-=0.2")
        this.outsideTimeline.add(this.seventh, "-=0.2")
        this.outsideTimeline.add(this.ninth)
        this.outsideTimeline.add(this.eigth, "-=0.1")
      },
    });
  }

  resize() {}

  update() {}
}
