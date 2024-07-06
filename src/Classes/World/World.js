/**
 * Imports
 */
import Experience from "../Experience";

/**
 * class World
 */
export default class World
{
    /** World constructor */
    constructor()
    {
        // Properties
        this.experience = new Experience();
        this.scene = this.experience.scene;
    }

    update()
    {

    }
}
