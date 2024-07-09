/**
 * Imports
 */
// Experience
import Experience from "../Experience";

// Planets
import Earth from "./Planets/Earth/Earth";
import Moon from "./Planets/Earth/Moon/Moon";

// Environment
import Environment from './Environment/Environment';
import { Vector3 } from "three";
import EarthGroup from "./Planets/Earth/EarthGroup";
import Sun from "./Planets/Sun/Sun";

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
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.resources.on('ready', () => {
            this.sun = new Sun();
            this.earth = new Earth();
            this.moon = new Moon(2, 0.01, new Vector3(0, 0, 0));
            this.earthGroup = new EarthGroup(
                this.earth.planet.earthMesh,
                this.earth.planet.atmosphereMesh,
                this.moon.moon.moonMesh,
                150 / 3,
                0.01
            );

            this.environment = new Environment();
        });
    }

    update()
    {
        if (this.sun) this.sun.update();
        if (this.moon) this.moon.update();
        if (this.earthGroup) this.earthGroup.update();
    }
}
