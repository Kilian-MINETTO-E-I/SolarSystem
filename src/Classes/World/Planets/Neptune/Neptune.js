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
import vertexShader from './shaders/neptune/vertex.glsl';
import fragmentShader from './shaders/neptune/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphere/vertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphere/fragment.glsl';

/**
 * class Neptune
 */
export default class Neptune
{
    /** Neptune constructor */
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
            neptune: this.resources.items.neptuneTexture
        };

        /** Atmosphere */
        this.atmosphereColor = {
            atmosphereDayColor: new Color('#85ADDB'),
            atmosphereTwilightColor: new Color('#274687')
        };

        this.neptune = {
            orbitRadius: this.orbitRadius,
            orbitAngle: 0,
            orbitSpeed: this.orbitSpeed
        };

        /** Functions */
        this.setGeometry();
        this.setMaterial();
        this.setAtmosphereMaterial();
        this.setAtmosphereMesh();
        this.setMesh();

        this.scene.add(this.neptune.mesh);

        this.neptune.atmosphereMesh.scale.set(1.04, 1.04, 1.04);
        this.scene.add(this.neptune.atmosphereMesh);
    }

    setGeometry()
    {
        this.neptune.geometry = new SphereGeometry(3.88, 32, 32);
    }

    setMaterial()
    {
        this.neptune.material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTexture: new Uniform(this.textures.neptune),
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(this.atmosphereColor.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.atmosphereColor.atmosphereTwilightColor),
            }
        });
    }

    setAtmosphereMaterial()
    {
        this.neptune.atmosphereMaterial = new ShaderMaterial({
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

    setMesh()
    {
        this.neptune.mesh = new Mesh(this.neptune.geometry, this.neptune.material);
    }

    setAtmosphereMesh()
    {
        this.neptune.atmosphereMesh = new Mesh(this.neptune.geometry, this.neptune.atmosphereMaterial);
    }

    update()
    {
        /** Neptune Orbit */
        this.neptune.orbitAngle += this.neptune.orbitSpeed;
        this.neptune.mesh.position.x =
            -(this.neptune.orbitRadius * Math.cos(this.neptune.orbitAngle));
        this.neptune.mesh.position.z =
            this.neptune.orbitRadius * Math.sin(this.neptune.orbitAngle);

        this.neptune.material.uniforms.uSunDirection.value = this.neptune.mesh.getWorldPosition(this.neptune.mesh.position);

        this.neptune.atmosphereMesh.position.x =
            -(this.neptune.orbitRadius * Math.cos(this.neptune.orbitAngle));
        this.neptune.atmosphereMesh.position.z =
            this.neptune.orbitRadius * Math.sin(this.neptune.orbitAngle);

        this.neptune.atmosphereMaterial.uniforms.uSunDirection.value = this.neptune.atmosphereMesh.getWorldPosition(this.neptune.atmosphereMesh.position);
    }
}
