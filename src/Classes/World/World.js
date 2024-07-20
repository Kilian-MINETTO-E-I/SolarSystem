/**
 * Imports
 */
// ThreeJs
import { Vector3 } from "three";

// Experience
import Experience from "../Experience";

// Planets
import EarthGroup from "./Planets/Earth/EarthGroup";
import Sun from "./Planets/Sun/Sun";
import Mercury from "./Planets/Mercury/Mercury";
import Venus from "./Planets/Venus/Venus";
import Mars from "./Planets/Mars/Mars";
import Jupiter from "./Planets/Jupiter/Jupiter";
import Saturn from "./Planets/Saturn/Saturn";
import Neptune from "./Planets/Neptune/Neptune";
import Uranus from "./Planets/Uranus/Uranus";

// Environment
import Environment from './Environment/Environment';

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
            this.mercury = new Mercury();
            this.venus = new Venus();
            this.earthGroup = new EarthGroup();
            this.mars = new Mars();
            this.jupiter = new Jupiter();
            this.saturn = new Saturn();
            this.uranus = new Uranus();
            this.neptune = new Neptune();

            this.environment = new Environment();
        });
    }

    update()
    {
        if (this.sun) this.sun.update();
        if (this.mercury) this.mercury.update();
        if (this.venus) this.venus.update();
        if (this.earthGroup) this.earthGroup.update();
        if (this.mars) this.mars.update();
        if (this.jupiter) this.jupiter.update();
        if (this.saturn) this.saturn.update();
        if (this.uranus) this.uranus.update();
        if (this.neptune) this.neptune.update();

        if (this.environment) this.environment.update();
    }
}
