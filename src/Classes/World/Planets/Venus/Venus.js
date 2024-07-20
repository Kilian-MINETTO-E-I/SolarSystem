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
 * class Venus
 */
export default class Venus extends Planet
{
    /** Venus constructor */
    constructor()
    {
        super(
            2.4674, // Planet Size
            -0.00011675, // Planet Rotation Speed
            1.03, // Atmosphere Size Scale
            new Vector3(0, 0, 0), // Sun Direction
            '#DD9900', // Atmosphere Day Color
            '#DD3300', // Atmosphere Twilight Color
            0.8, // Clouds Intensity
        );

        /** Orbit Parameters */
        this.orbit.orbitRadius = 108.2 / 4;
        this.orbit.orbitSpeed = 0.003;

        this._setTexture(
            this.resources.items.venusTexture,
            new Vector3(0, 0, 0),
            this.resources.items.venusAtmosphere
        );
    }
}
