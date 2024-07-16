/**
 * Imports
 */
// ThreeJs
import {
    BackSide,
    Color,
    Mesh,
    ShaderMaterial,
    SphereGeometry,
    Uniform,
    Vector3
} from "three";

// Experience
import Experience from "../../../Experience";

// Shaders
import vertexShader from './shaders/jupiter/vertex.glsl';
import fragmentShader from './shaders/jupiter/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphere/vertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphere/fragment.glsl';

/**
 * class Jupiter
 */
export default class Jupiter
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

        /** Properties */
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.sunPosition = sunPosition;

        /** Textures */
        this.textures = {
            jupiter: this.resources.items.jupiterTexture
        };

        this.atmosphereColor = {
            atmosphereDayColor: new Color("#D8CA9D"),
            atmosphereTwilightColor: new Color("#A59186")
        };

        this.jupiter = {
            orbitRadius: this.orbitRadius,
            orbitAngle: 0,
            orbitSpeed: this.orbitSpeed,
            noiseSpeed: 0.1
        };

        /** Functions */
        this.setGeometry();
        this.setMaterial();
        this.setAtmosphereMaterial();
        this.setMesh();
        this.setAtmosphereMesh();

        this.scene.add(this.jupiter.mesh);

        this.jupiter.atmosphereMesh.scale.set(1.05, 1.05, 1.05);
        this.scene.add(this.jupiter.atmosphereMesh);
    }

    setGeometry()
    {
        this.jupiter.geometry = new SphereGeometry(29.146, 32, 32);
    }

    setMaterial()
    {
        this.jupiter.material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: new Uniform(this.jupiter.noiseSpeed),
                uTexture: new Uniform(this.textures.jupiter),
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(this.atmosphereColor.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.atmosphereColor.atmosphereTwilightColor),
                uFrequency: new Uniform(10)
            }
        });
    }

    setMesh()
    {
        this.jupiter.mesh = new Mesh(this.jupiter.geometry, this.jupiter.material);
    }

    setAtmosphereMaterial()
    {
        this.jupiter.atmosphereMaterial = new ShaderMaterial({
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            uniforms: {
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(this.atmosphereColor.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.atmosphereColor.atmosphereTwilightColor),
            },
            side: BackSide,
            transparent: true
        });
    }

    setAtmosphereMesh()
    {
        this.jupiter.atmosphereMesh = new Mesh(this.jupiter.geometry, this.jupiter.atmosphereMaterial);
    }

    update()
    {
        /** Jupiter Rotation */
        this.jupiter.mesh.rotateY(0.0047051);

        /** Jupiter Orbit */
        this.jupiter.orbitAngle += this.jupiter.orbitSpeed;
        this.jupiter.mesh.position.x =
            -(this.jupiter.orbitRadius * Math.cos(this.jupiter.orbitAngle));
        this.jupiter.mesh.position.z =
            this.jupiter.orbitRadius * Math.sin(this.jupiter.orbitAngle);

        this.jupiter.material.uniforms.uSunDirection.value = this.jupiter.mesh.getWorldPosition(this.jupiter.mesh.position);

        this.jupiter.atmosphereMesh.position.x =
            -(this.jupiter.orbitRadius * Math.cos(this.jupiter.orbitAngle));
        this.jupiter.atmosphereMesh.position.z =
            this.jupiter.orbitRadius * Math.sin(this.jupiter.orbitAngle);

        this.jupiter.atmosphereMaterial.uniforms.uSunDirection.value = this.jupiter.atmosphereMesh.getWorldPosition(this.jupiter.atmosphereMesh.position);
    }
}
