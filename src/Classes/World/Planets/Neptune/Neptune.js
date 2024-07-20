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
 * class Neptune
 */
export default class Neptune extends Planet
{
    /** Neptune constructor */
    constructor()
    {
        super(
            10.088, // Planet Size
            0.0012146, // Planet Rotation Speed
            1.04, // Atmosphere Size Scale
            new Vector3(0, 0, 0), // Sun Direction
            '#85ADD8', // Atmosphere Day Color
            '#274687', // Atmosphere Twilight Color
            0, // Clouds Intensity
        );

        /** Orbit Parameters */
        this.orbit.orbitRadius = 4495.1 / 5;
        this.orbit.orbitSpeed = 0.0005;

        this._setTexture(
            this.resources.items.neptuneTexture,
            this.defaultTexture,
            this.defaultTexture
        );
    }
}
