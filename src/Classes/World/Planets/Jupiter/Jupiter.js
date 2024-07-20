/**
 * Imports
 */
// ThreeJs
import {
    Vector3
} from 'three';

// Planet
import Planet from '../Planet';

/**
 * class Jupiter
 */
export default class Jupiter extends Planet
{
    /** Jupiter constructor */
    constructor()
    {
        super(
            29.146, // Planet Size
            0.0047051, // Planet Rotation Speed
            1.05, // Atmosphere Size Scale
            new Vector3(0, 0, 0), // Sun Direction
            '#D8CA9D', // Atmosphere Day Color
            '#A59186', // Atmosphere Twilight Color
            0, // Clouds Intensity
        );

        /** Orbit Parameters */
        this.orbit.orbitRadius = 778.3 / 4;
        this.orbit.orbitSpeed = 0.0013;

        this._setTexture(
            this.resources.items.jupiterTexture,
            this.defaultTexture,
            this.defaultTexture
        );
    }
}
