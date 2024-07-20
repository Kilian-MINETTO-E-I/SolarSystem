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
 * class Uranus
 */
export default class Uranus extends Planet
{
    /** Uranus constructor */
    constructor()
    {
        super(
            10.426, // Planet Size
            0.0009320, // Planet Rotation Speed
            1.05, // Atmosphere Size Scale
            new Vector3(0, 0, 0), // Sun Direction
            '#E1EEEE', // Atmosphere Day Color
            '#C6D3E3', // Atmosphere Twilight Color
            0, // Clouds Intensity
        );

        /** Orbit Parameters */
        this.orbit.orbitRadius = 2872.5 / 4;
        this.orbit.orbitSpeed = 0.0007;

        this._setTexture(
            this.resources.items.uranusTexture,
            this.defaultTexture,
            this.defaultTexture
        );
    }
}
