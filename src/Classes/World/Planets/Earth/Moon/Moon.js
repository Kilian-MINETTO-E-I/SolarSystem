/**
 * Imports
 */
// ThreeJs
import {
    Vector3
} from 'three';

// Planet
import Planet from '../../Planet';

/**
 * class Moon
 */
export default class Moon extends Planet
{
    /** Moon constructor */
    constructor()
    {
        super(
            0.702, // Planet Size
            -0.015, // Planet Rotation Speed
            1.01, // Atmosphere Size Scale
            new Vector3(0, 0, 0), // Sun Direction
            '#AAAAAA', // Atmosphere Day Color
            '#222222', // Atmosphere Twilight Color
            0, // Clouds Intensity
        );

        /** Orbit Parameters */
        this.orbit.moon.orbitRadius = 4;
        this.orbit.moon.orbitSpeed = 0.05;

        this._setTexture(
            this.resources.items.moonTexture,
            this.defaultTexture,
            this.defaultTexture
        );
    }
}
