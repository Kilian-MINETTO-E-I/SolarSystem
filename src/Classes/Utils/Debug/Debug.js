/**
 * Imports
 */
import GUI from "lil-gui";

/**
 * class Debug
 */
export default class Debug
{
    /** Debug constructor */
    constructor()
    {
        this.active = window.location.hash === "#debug";

        if (this.active) {
            this.ui = new GUI();
        }
    }
}
