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
 * class Mercury
 */
export default class Mercury
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

        this.mercury = {
            orbitRadius: this.orbitRadius,
            orbitAngle: 0,
            orbitSpeed: this.orbitSpeed
        };

        this.atmosphereColor = {
            atmosphereDayColor: new Color('#DDDDDD'),
            atmosphereTwilightColor: new Color('#333333'),
        };

        /** Textures */
        this.textures = {
            mercuryTexture: this.resources.items.mercuryTexture
        };

        /** Functions */
        this.setGeometry()
        this.setMaterial();
        this.setMesh();

        this.scene.add(this.mercury.mesh);
    }

    setGeometry()
    {
        this.mercury.geometry = new SphereGeometry(0.383, 32, 32);
    }

    setMaterial()
    {
        this.mercury.material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTexture: new Uniform(this.textures.mercuryTexture),
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(this.atmosphereColor.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.atmosphereColor.atmosphereTwilightColor),
            }
        });
    }

    setMesh()
    {
        this.mercury.mesh = new Mesh(this.mercury.geometry, this.mercury.material);
    }

    update()
    {
        /** Mercrury Orbit */
        this.mercury.orbitAngle += this.mercury.orbitSpeed;
        this.mercury.mesh.position.x =
            -(this.mercury.orbitRadius * Math.cos(this.mercury.orbitAngle));
        this.mercury.mesh.position.z =
            this.mercury.orbitRadius * Math.sin(this.mercury.orbitAngle);

        this.mercury.material.uniforms.uSunDirection.value = this.mercury.mesh.getWorldPosition(this.sunPosition);
    }
}
