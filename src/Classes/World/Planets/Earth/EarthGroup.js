/**
 * Imports
 */
// ThreeJS
import {
    Group,
    Vector3
} from "three";

// Experience
import Experience from "../../../Experience";
import Earth from "./Earth";
import Moon from "./Moon/Moon";

/**
 * class EarthGroup
 */
export default class EarthGroup
{
    constructor()
    {
        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;

        // Properties
        this.earth = new Earth();
        this.moon = new Moon();
        this.earth.orbitAngle = 0;
        this.moon.orbitAngle = 0;

        // Functions
        this.setEarthGroup();

        this.earthGroup.orbitAngle = 0;
        this.scene.add(this.earthGroup);
    }

    setEarthGroup()
    {
        this.earthGroup = new Group();
        this.earthGroup.add(this.earth.planet.mesh);
        this.earthGroup.add(this.earth.atmosphere.mesh);
        this.earthGroup.add(this.moon.planet.mesh);
        this.earthGroup.add(this.moon.atmosphere.mesh);
    }

    update()
    {
        /** Earth Rotation */
        this.earthGroup.children[0].rotation.y += 0.01675;

        /** EarthGroup Orbit */
        this.earthGroup.orbitAngle += this.earth.orbit.earth.orbitSpeed

        /** Earth Group Rotation */
        this.earthGroup.position.set(
            -(this.earth.orbit.earth.orbitRadius * Math.cos(this.earthGroup.orbitAngle)),
            0,
            this.earth.orbit.earth.orbitRadius * Math.sin(this.earthGroup.orbitAngle)
        )

        /** Moon Orbit */
        this.moon.orbitAngle += this.moon.orbit.moon.orbitSpeed;

        // Planet
        this.earthGroup.children[2].position.set(
            -(this.moon.orbit.moon.orbitRadius * Math.cos(this.moon.orbitAngle)),
            0,
            this.moon.orbit.moon.orbitRadius * Math.sin(this.moon.orbitAngle)
        );
        // Atmosphere
        this.earthGroup.children[3].position.set(
            -(this.moon.orbit.moon.orbitRadius * Math.cos(this.moon.orbitAngle)),
            0,
            this.moon.orbit.moon.orbitRadius * Math.sin(this.moon.orbitAngle)
        );

        /** Sun Orientation */
        this.earth.planet.material.uniforms.uSunDirection.value = this.earth.planet.mesh.getWorldPosition(this.earth.sunDirection);
        this.earth.atmosphere.material.uniforms.uSunDirection.value = this.earth.planet.mesh.getWorldPosition(this.earth.sunDirection);
        this.moon.planet.material.uniforms.uSunDirection.value = this.moon.planet.mesh.getWorldPosition(this.moon.sunDirection);
        this.moon.atmosphere.material.uniforms.uSunDirection.value = this.moon.planet.mesh.getWorldPosition(this.moon.sunDirection);
    }
}
