/**
 * Imports
 */
import EventEmitter from "../Events/EventEmitter";

/**
 * class Time
 */
export default class Time extends EventEmitter
{
    /** Time constructor */
    constructor()
    {
        super();

        // Setup
        this.start = Date.now();
        this.currentTime = this.start;
        this.elapsedTime = 0;
        this.deltaTime = 16;

        window.requestAnimationFrame(() => {
            this.tick();
        });
    }

    tick()
    {
        const currentTime = Date.now();
        const delta = currentTime - this.currentTime;
        this.elapsedTime = this.currentTime - this.start;

        this.trigger('tick');

        window.requestAnimationFrame(() => {
            this.tick();
        });
    }
}
