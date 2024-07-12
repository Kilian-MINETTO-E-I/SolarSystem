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
import Mercury from "./Planets/Mercury/Mercury";
import Venus from "./Planets/Venus/Venus";
import Mars from "./Planets/Mars/Mars";
import Jupiter from "./Planets/Jupiter/Jupiter";
import Saturn from "./Planets/Saturn/Saturn";

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
        this.sunPosition = new Vector3(0, 0, 0);

        this.resources.on('ready', () => {
            this.sun = new Sun();
            this.mercury = new Mercury(57.9 / 2, 0.004, this.sunPosition);
            this.venus = new Venus(108.2 / 2, 0.003, this.sunPosition);
            this.earth = new Earth();
            this.moon = new Moon(2, -0.05, this.sunPosition);
            this.earthGroup = new EarthGroup(
                this.earth.planet.earthMesh,
                this.earth.planet.atmosphereMesh,
                this.moon.moon.moonMesh,
                149.6 / 2,
                0.002
            );
            this.mars = new Mars(227.9 / 2, 0.0018, this.sunPosition);
            this.jupiter = new Jupiter(778.3 / 2, 0.0013, this.sunPosition);
            this.saturn = new Saturn(1433.5 / 2, 0.001, this.sunPosition);

            this.environment = new Environment();
        });
    }

    update()
    {
        if (this.sun) this.sun.update();
        if (this.mercury) this.mercury.update();
        if (this.venus) this.venus.update();
        if (this.earthGroup) this.earthGroup.update();
        if (this.moon) this.moon.update();
        if (this.mars) this.mars.update();
        if (this.jupiter) this.jupiter.update();
        if (this.saturn) this.saturn.update();

        if (this.environment) this.environment.update();
    }
}
