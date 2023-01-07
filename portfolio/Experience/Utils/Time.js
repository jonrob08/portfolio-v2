import { EventEmitter } from "events"

export default class Time extends EventEmitter {
  constructor() {
    super()
    // Time experience was initiated
    this.start = Date.now();
    // Set current time
    this.current = this.start;
    // Time that's passed since experience started
    this.elapsed = 0;
    // Time between each frame (in milliseconds/60fps)
    this.delta = 16;

    this.update();
  }

  update() {
    const currentTime = Date.now()
    // Calculating delta, 
    this.delta = currentTime - this.current
    this.current = currentTime
    // Elapsed is useful if I want to play something after the scene starts
    this.elapsed = this.current - this.start

    // console.log(this.delta)
    this.emit("update")
    window.requestAnimationFrame(() => this.update())
  }
}
