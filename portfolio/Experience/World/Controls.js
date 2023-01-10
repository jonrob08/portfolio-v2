import * as THREE from "three";
import Experience from "../Experience";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time

    this.setPath()
  }



  setPath() {
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3( -10, 0, 10 ),
        new THREE.Vector3( -5, 0, 5 ),
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 5, -5, 5 ),
        new THREE.Vector3( 10, 0, 10 ),
    ])

    const points = curve.getPoints( 50 )
    const geometry = new THREE.BufferGeometry().setFromPoints( points )

    const material = new THREE.LineBasicMaterial( { color: 0xff0000 } )

    const curveObject = newThree.Line( geometry, material )

  }

  resize() {}

  update() {
  }
}
