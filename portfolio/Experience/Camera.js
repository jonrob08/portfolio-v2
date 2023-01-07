import * as THREE from "three";
import Experience from "./Experience.js";

// The Camera class represents a camera in the 3D scene. It has a constructor method that is called when a new instance of the class is created.
export default class Camera {
  constructor() {
    // creates a new instance of Experience and assigns it to this
    this.experience = new Experience();
    // assign sizes, scene, and canvas to the experience
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    // two camera types are useful for when I start pathing
    this.createPerspectiveCamera();
    this.createOrthographicCamera();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
  }

  createOrthographicCamera() {
    this.frustrum = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(
      // left
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      // right
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      // top
      this.sizes.frustrum / 2,
      // bottom
      -this.sizes.frustrum / 2,
      -100,
      100
    );
    this.scene.add(this.orthographicCamera);
  }

  resize() {
    // updating perspective camera on resize
    this.perspectiveCamera.aspect = this.sizes.aspect
    this.perspectiveCamera.updateProjectionMatrix()

    // updating orthographic camera on resize
    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2
    this.orthographicCamera.top = this.sizes.frustrum / 2
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2
    this.orthographicCamera.updateProjectionMatrix()
  }

  update() {
    
  }
}
