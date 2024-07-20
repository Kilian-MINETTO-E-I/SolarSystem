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
 * class Earth
 */
export default class Earth extends Planet
{
    /** Earth constructor */
    constructor()
    {
        super(
            2.6, // Planet Size
            0.01675, // Planet Rotation Speed
            1.02, // Atmosphere Size Scale
            new Vector3(0, 0, 0), // Sun Direction
            '#00AAFF', // Atmosphere Day Color
            '#FF6600', // Atmosphere Twilight Color
            1, // Clouds Intensity
        );

        /** Orbit Parameters */
        this.orbit.earth.orbitRadius = 149.6 / 4;
        this.orbit.earth.orbitSpeed = 0.0017;

        this._setTexture(
            this.resources.items.earthDayTexture,
            this.resources.items.earthNightTexture,
            this.resources.items.earthCloudsTexture
        );
    }
}
