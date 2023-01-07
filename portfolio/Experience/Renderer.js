import * as THREE from "three";
import Experience from "./Experience.js";

// The Renderer class represents a  WebGL or canvas renderer that can be used to draw the scene and its objects to a canvas element in the HTML document. It is responsible for drawing (or rendering) the 3D scene onto the screen
export default class Renderer {
  constructor() {
    // Creates a new instance of Experience and assigns it to this
    this.experience = new Experience();
    // Assign sizes, scene, and canvas to the experience
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    // Add camera
    this.camera = this.experience.camera;
    // Test
    console.log(this.camera, this.camera.perspectiveCamera)

    this.setRenderer(this.camera, this.camera.perspectiveCamera);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      // removes jagged edges and lines
      antialias: true,
    });

    /*  Renderer settings options below */

    // The physicallyCorrectLights option specifies whether the renderer should apply physical corrections to lighting calculations. This can produce more realistic lighting.
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.physicallyCorrectLights
    this.renderer.physicallyCorrectLights = true;
    // The outputEncoding option specifies the encoding of the rendered image. The sRGBEncoding value indicates that the renderer should use sRGB encoding, which is a standard for displaying images on the web.
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.outputEncoding
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    // The toneMapping option specifies how the renderer should map high dynamic range (HDR) colors to low dynamic range (LDR) colors for display. The CineonToneMapping value indicates that the renderer should use a tone mapping function based on the Cineon film curve.
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.toneMapping
    this.renderer.toneMapping = THREE.CineonToneMapping;
    // The toneMappingExposure option specifies the exposure value used in the tone mapping process. A higher value will result in a brighter image.
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.toneMappingExposure
    this.renderer.toneMappingExposure = 1.75;
    // The shadowMap.enabled option enables or disables the use of shadows in the renderer.
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.shadowMap
    this.renderer.shadowMap.enabled = true;
    // The shadowMap.type option specifies the type of shadow map to use. The PCFSoftShadowMap value indicates that the renderer should use a Percentage-Closer Filtering (PCF) shadow map with soft shadows.
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.shadowMap
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // The setSize method sets the width and height of the renderer's output canvas in pixels.
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setSize
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    // The setPixelRatio method sets the pixel ratio of the renderer, which can be used to adjust the rendering resolution to match the display device.
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setPixelRatio
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
  }
}
