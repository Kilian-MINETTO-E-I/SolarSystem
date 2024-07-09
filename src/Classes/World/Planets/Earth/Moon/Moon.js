/**
 * Imports
 */
// ThreeJS
import {
    SphereGeometry,
    Mesh,
    Color,
    ShaderMaterial,
    Uniform,
    Vector3
} from "three";

// Experience
import Experience from "../../../../Experience";

// Shaders
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

// class Moon
export default class Moon
{
    constructor(
        orbitRadius,
        orbitSpeed,
        sunPosition
    )
    {
        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Properties
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.sunPosition = sunPosition;

        // Moon
        this.moon = {
            geometry: null,
            moonMaterial: null,
            moonMesh: null,
            atmosphereMaterial: null,
            atmosphereMesh: null,
            orbitRadius: this.orbitRadius,
            orbitAngle: 0,
            orbitSpeed: this.orbitSpeed,
        };

        // Moon Texture
        this.textures = {
            moonTexture: this.resources.items.moonTexture,
        };

        // Moon Atmosphere
        this.atmosphereColor = {
            atmosphereDayColor: new Color("#00AAFF"),
            atmosphereTwilightColor: new Color("#222222")
        };

        // Functions
        this.setGeometry();
        this.setMaterial();
        this.setMesh();

        this.moon.moonMesh.rotateZ(-0.015);
    }

    setGeometry()
    {
        this.moon.geometry = new SphereGeometry(0.27, 32, 32);
    }

    setMaterial()
    {
        this.moon.moonMaterial = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTexture: new Uniform(this.textures.moonTexture),
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(this.atmosphereColor.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.atmosphereColor.atmosphereTwilightColor),
            }
        });
    }

    setMesh()
    {
        this.moon.moonMesh = new Mesh(this.moon.geometry, this.moon.moonMaterial);
    }

    update()
    {
        /** Moon Sun Orbit */
        this.moon.orbitAngle += this.moon.orbitSpeed;
        this.moon.moonMesh.position.x =
            this.moon.orbitRadius * Math.cos(this.moon.orbitAngle);
        this.moon.moonMesh.position.z =
            this.moon.orbitRadius * Math.sin(this.moon.orbitAngle);

        this.moon.moonMaterial.uniforms.uSunDirection.value = this.moon.moonMesh.getWorldPosition(this.sunPosition);
    }
}
