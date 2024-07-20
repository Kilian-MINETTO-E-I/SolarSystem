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
 * class Mars
 */
export default class Mars extends Planet
{
    /** Mars constructor */
    constructor()
    {
        super(
            1.3, // Planet Size
            0.01674, // Planet Rotation Speed
            1.06, // Atmosphere Size Scale
            new Vector3(0, 0, 0), // Sun Direction
            '#C1440E', // Atmosphere Day Color
            '#451804', // Atmosphere Twilight Color
            0, // Clouds Intensity
        );

        /** Orbit Parameters */
        this.orbit.orbitRadius = 227.9 / 4;
        this.orbit.orbitSpeed = 0.0018;

        this._setTexture(
            this.resources.items.marsTexture,
            this.defaultTexture,
            this.defaultTexture
        );
    }
}
