import * as THREE from "three"

import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Resources from "./Utils/Resources"
import assets from "./Utils/assets"

import Camera from "./Camera"
import Renderer from "./Renderer"

import World from "./World/World"
import Theme from "./Theme"

export default class Experience {
    static instance
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.time = new Time()
        this.sizes = new Sizes()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(assets)
        this.theme = new Theme()
        this.world = new World()

        // .on listens to the created event
        this.time.on("resize", ()=>{
            this.resize()
        })
        this.time.on("update", ()=>{
            this.update()
        })
    }
    
    resize(){
        this.camera.resize()
        this.world.resize()
        this.renderer.resize()
    }

    update(){
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
}