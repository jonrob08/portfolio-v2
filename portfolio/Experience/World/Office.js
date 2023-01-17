import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { RectAreaLight } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

export default class Office {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.office = this.resources.items.office;
    this.actualOffice = this.office.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    this.actualOffice.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      if (child.name === "aquarium") {
        child.children[4].material = new THREE.MeshPhysicalMaterial();
        child.children[4].material.roughness = 0;
        child.children[4].material.color.set(0x549dd2);
        child.children[4].material.ior = 3;
        child.children[4].material.transmission = 1;
        child.children[4].material.opacity = 1;
      }

      if (child.name === "Computer") {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      if (child.name === "ShelfItems") {
        child.children[11].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.pfp,
        });
      }

      if (child.name === "porch") {
        child.position.x = 5.4223;
        child.position.z = -5.4223;
      }

      // if (
      //   child.name === "Mailbox" ||
      //   child.name === "flower_1" ||
      //   child.name === "flower_2" ||
      //   child.name === "lamp_outside" ||
      //   child.name === "step_stone_1" ||
      //   child.name === "step_stone_2" ||
      //   child.name === "step_stone_3" ||
      //   child.name === "dirt"
      // ) {
      //   child.scale.set(0, 0, 0);
      // }
      // console.log(child)
      child.scale.set(0, 0, 0);
      if (child.name === "Cube") {
        child.scale.set(1, 1, 1);
        child.position.set(0, -1, 0)
        child.rotation.y = Math.PI / 4
      }
      if (child.name === "aquarium") {
        child.children[0].scale.set(0, 0, 0);
        child.children[1].scale.set(0, 0, 0);
        child.children[2].scale.set(0, 0, 0);
        child.children[3].scale.set(0, 0, 0);
        child.children[4].scale.set(0, 0, 0);
        child.children[5].scale.set(0, 0, 0);
        child.children[6].scale.set(0, 0, 0);
        child.children[7].scale.set(0, 0, 0);
        child.children[8].scale.set(0, 0, 0);
      } else {
        console.log("nope");
      }
      // if(child.name==="Computer"){
      //   child.scale.set(5,5,5)
      // }
    });

    const width = 0.8;
    const height = 0.4;
    const intensity = 1;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(6.58127, 7, -3.3767);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = -Math.PI / 4;
    this.actualOffice.add(rectLight);

    // const rectLightHelper = new RectAreaLightHelper(rectLight)
    // rectLight.add(rectLightHelper)

    this.scene.add(this.actualOffice);
    this.actualOffice.scale.set(0.11, 0.11, 0.11);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualOffice);
    this.swim = this.mixer.clipAction(this.office.animations[0]);
    console.log(this.office);
    this.swim.play();
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      // console.log(e)
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualOffice.rotation.y = this.lerp.current;

    this.mixer.update(this.time.delta);
  }
}
