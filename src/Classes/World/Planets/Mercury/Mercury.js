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
 * class Mercury
 */
export default class Mercury extends Planet
{
    /** Mercury constructor */
    constructor()
    {
        super(
            0.9958, // Planet Size
            0.000646, // Planet Rotation Speed
            1.02, // Atmosphere Size Scale
            new Vector3(0, 0, 0), // Sun Direction
            '#DDDDDD', // Atmosphere Day Color
            '#333333', // Atmosphere Twilight Color
            0, // Clouds Intensity
        );

        /** Orbit Parameters */
        this.orbit.orbitRadius = 54.9 / 4;
        this.orbit.orbitSpeed = 0.004;

        this._setTexture(
            this.resources.items.mercuryTexture,
            this.defaultTexture,
            this.defaultTexture
        );
    }
}
