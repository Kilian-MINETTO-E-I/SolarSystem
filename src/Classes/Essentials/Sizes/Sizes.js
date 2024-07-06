/**
 * Imports
 */
import EventEmitter from '../../Utils/Events/EventEmitter';

/**
 * class Sizes
 */
export default class Sizes extends EventEmitter
{
    /** Sizes constructor */
    constructor()
    {
        super();

        // Properties
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        /** Resize Event */
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);

            this.trigger('resize');
        });
    }
}
