/**
 * Imports
 */
// ThreeJs
import {
    Color,
    Mesh,
    ShaderMaterial,
    SphereGeometry,
    Uniform,
    Vector3
} from 'three';

// Experience
import Experience from '../../../Experience';

// Shaders
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

/**
 * class Mars
 */
export default class Mars
{
    constructor(
        orbitRadius,
        orbitSpeed,
        sunPosition
    )
    {
        /** Setup */
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Properties
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.sunPosition = sunPosition;

        this.atmosphereColor = {
            atmosphereDayColor: new Color("#C1440E"),
            atmosphereTwilightColor: new Color("#451804")
        }

        // Textures
        this.textures = {
            mars: this.resources.items.marsTexture
        };

        this.mars = {
            orbitRadius: this.orbitRadius,
            orbitAngle: 0,
            orbitSpeed: this.orbitSpeed
        };

        /** Functions */
        this.setGeometry();
        this.setMaterial();
        this.setMesh();

        this.scene.add(this.mars.mesh);
    }

    setGeometry()
    {
        this.mars.geometry = new SphereGeometry(0.532, 32, 32);
    }

    setMaterial()
    {
        this.mars.material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTexture: new Uniform(this.textures.mars),
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(this.atmosphereColor.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.atmosphereColor.atmosphereTwilightColor),
            }
        });
    }

    setMesh()
    {
        this.mars.mesh = new Mesh(this.mars.geometry, this.mars.material);
    }

    update()
    {
        /** Mars Rotation */
        this.mars.mesh.rotateY(0.01674);

        /** Mars Orbit */
        this.mars.orbitAngle += this.mars.orbitSpeed;
        this.mars.mesh.position.x =
            -(this.mars.orbitRadius * Math.cos(this.mars.orbitAngle));
        this.mars.mesh.position.z =
            this.mars.orbitRadius * Math.sin(this.mars.orbitAngle);

        this.mars.material.uniforms.uSunDirection.value = this.mars.mesh.getWorldPosition(this.mars.mesh.position);
    }
}
