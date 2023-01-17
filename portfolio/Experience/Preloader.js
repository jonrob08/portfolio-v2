import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/divToSpan"

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.world = this.experience.world;

    this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

    this.world.on("worldready", () => {
      this.setAssets()
      this.playIntro();
    });
  }

  setAssets(){
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main-title"));
    convert(document.querySelector(".hero-main-description"));
    convert(document.querySelector(".hero-secondary-subtitle"));
    convert(document.querySelector(".hero-secondary-subdescription"));
    
    this.office = this.experience.world.office.actualOffice
    this.officeChildren = this.experience.world.office.officeChildren
    console.log(this.officeChildren)
  }

  firstIntro() {
    return new Promise((resolve) => {
        this.timeline = new GSAP.timeline();
        this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
        this.timeline.to(".preloader", {
            opacity: 0,
            delay: 1,
            onComplete: () => {
                document
                    .querySelector(".preloader")
                    .classList.add("hidden");
            },
        });
        if (this.device === "desktop") {
            this.timeline
                .to(this.officeChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                })
                .to(this.office.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                });
        } else {
            this.timeline
                .to(this.officeChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                })
                .to(this.office.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                });
        }
        this.timeline
            .to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
            })
            .to(
                ".arrow-svg-wrapper",
                {
                    opacity: 1,
                },
                "same"
            )
            .to(
                ".toggle-bar",
                {
                    opacity: 1,
                    onComplete: resolve,
                },
                "same"
            );
    });
}

secondIntro() {
    return new Promise((resolve) => {
        this.secondTimeline = new GSAP.timeline();

        this.secondTimeline
            .to(
                ".intro-text .animatedis",
                {
                    yPercent: 100,
                    stagger: 0.05,
                    ease: "back.in(1.7)",
                },
                "fadeout"
            )
            .to(
                ".arrow-svg-wrapper",
                {
                    opacity: 0,
                },
                "fadeout"
            )
            .to(
                this.office.position,
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                },
                "same"
            )
            .to(
                this.officeChildren.cube.rotation,
                {
                    y: 2 * Math.PI + Math.PI / 4,
                },
                "same"
            )
            .to(
                this.officeChildren.cube.scale,
                {
                    x: 10,
                    y: 10,
                    z: 10,
                },
                "same"
            )
            .to(
                this.camera.orthographicCamera.position,
                {
                    y: 3.5,
                },
                "same"
            )
            .to(
                this.officeChildren.cube.position,
                {
                    x: 0.638711,
                    y: 8.5618,
                    z: 1.3243,
                },
                "same"
            )
            .set(this.officeChildren.body.scale, {
                x: 1,
                y: 1,
                z: 1,
            })
            .to(
                this.officeChildren.cube.scale,
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1,
                },
                "introtext"
            )
            .to(
                ".hero-main-title .animatedis",
                {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                },
                "introtext"
            )
            .to(
                ".hero-main-description .animatedis",
                {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                },
                "introtext"
            )
            .to(
                ".first-sub .animatedis",
                {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                },
                "introtext"
            )
            .to(
                ".second-sub .animatedis",
                {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                },
                "introtext"
            )
            .to(
                this.officeChildren.aquarium.children[0].scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.5"
            ).to(
                this.officeChildren.aquarium.children[1].scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.5"
            ).to(
                this.officeChildren.aquarium.children[2].scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.5"
            ).to(
                this.officeChildren.aquarium.children[3].scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.5"
            ).to(
                this.officeChildren.aquarium.children[4].scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.5"
            ).to(
                this.officeChildren.aquarium.children[5].scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.5"
            ).to(
                this.officeChildren.aquarium.children[6].scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.5"
            ).to(
                this.officeChildren.aquarium.children[7].scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.5"
            ).to(
                this.officeChildren.aquarium.children[8].scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.5"
            )
            .to(
                this.officeChildren.clock.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.4"
            )
            .to(
                this.officeChildren.shelfitems.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.3"
            )
            .to(
                this.officeChildren.floor_items.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.2"
            )
            .to(
                this.officeChildren.desks.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.1"
            )
            .to(
                this.officeChildren.table_stuff.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                ">-0.1"
            )
            .to(this.officeChildren.computer.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            })
            .set(this.officeChildren.porch.scale, {
                x: 1,
                y: 1,
                z: 1,
            })
            .to(
                this.officeChildren.chair.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                "chair"
            )
            .to(
                this.officeChildren.fishy.scale,
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                },
                "chair"
            )
            .to(
                this.officeChildren.chair.rotation,
                {
                    y: 4 * Math.PI + Math.PI / 4,
                    ease: "power2.out",
                    duration: 1,
                },
                "chair"
            )
            .to(".arrow-svg-wrapper", {
                opacity: 1,
                onComplete: resolve,
            });
    });
}

onScroll(e) {
    if (e.deltaY > 0) {
        this.removeEventListeners();
        this.playSecondIntro();
    }
}

onTouch(e) {
    this.initalY = e.touches[0].clientY;
}

onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initalY - currentY;
    if (difference > 0) {
        console.log("swipped up");
        this.removeEventListeners();
        this.playSecondIntro();
    }
    this.intialY = null;
}

removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
}

async playIntro() {
    this.scaleFlag = true;
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
}
async playSecondIntro() {
    this.moveFlag = false;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit("enablecontrols");
}

move() {
    if (this.device === "desktop") {
        this.office.position.set(-1, 0, 0);
    } else {
        this.office.position.set(0, 0, -1);
    }
}

scale() {
    this.officeChildren.rectLight.width = 0;
    this.officeChildren.rectLight.height = 0;

    if (this.device === "desktop") {
        this.office.scale.set(0.11, 0.11, 0.11);
    } else {
        this.office.scale.set(0.07, 0.07, 0.07);
    }
}

}
