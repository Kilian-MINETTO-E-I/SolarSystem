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

/**
 * class EarthGroup
 */
export default class EarthGroup
{
    constructor(
        earthMesh,
        earthAtmosphereMesh,
        moonMesh,
        orbitRadius,
        orbitSpeed
    )
    {
        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;

        // Properties
        this.earthMesh = earthMesh;
        this.earthAtmosphereMesh = earthAtmosphereMesh;
        this.moonMesh = moonMesh;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.orbitAngle = 0;

        // Functions
        this.setEarthGroup();

        this.scene.add(this.earthGroup);
    }

    setEarthGroup()
    {
        this.earthGroup = new Group();
        this.earthGroup.add(this.earthMesh);
        this.earthGroup.add(this.earthAtmosphereMesh);
        this.earthGroup.add(this.moonMesh);
    }

    update()
    {
        /** Earth Rotation */
        this.earthGroup.children[0].rotateY(0.01675);

        /** Group Orbit */
        this.orbitAngle += this.orbitSpeed;
        this.earthGroup.position.x =
            -(this.orbitRadius * Math.cos(this.orbitAngle));
        this.earthGroup.position.z =
            this.orbitRadius * Math.sin(this.orbitAngle);

        /** Earth Sun Orientation Shader */
        const sunDirection = new Vector3();
        this.earthGroup.children[0].getWorldPosition(sunDirection);
        this.earthGroup.children[0].material.uniforms.uSunDirection.value.copy(sunDirection);

        this.earthGroup.children[1].getWorldPosition(sunDirection);
        this.earthGroup.children[1].material.uniforms.uSunDirection.value.copy(sunDirection);
    }
}
