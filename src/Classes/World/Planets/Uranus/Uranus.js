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
} from 'three';

// Experience
import Experience from '../../../Experience.js';

// Shaders
import vertexShader from './shaders/uranus/vertex.glsl';
import fragmentShader from './shaders/uranus/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphere/vertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphere/fragment.glsl';

/**
 * class Uranus
 */
export default class Uranus
{
    /** Uranus constructor */
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
            uranus: this.resources.items.uranusTexture
        };

        /** Atmosphere */
        this.atmosphereColor = {
            atmosphereDayColor: new Color('#E1EEEE'),
            atmosphereTwilightColor: new Color('#C6D3E3')
        };

        this.uranus = {
            orbitRadius: this.orbitRadius,
            orbitAngle: 0,
            orbitSpeed: this.orbitSpeed
        };

        /** Functions */
        this.setGeometry();
        this.setMaterial();
        this.setAtmosphereMaterial();
        this.setMesh();
        this.setAtmosphereMesh();

        this.scene.add(this.uranus.mesh);

        this.uranus.atmosphereMesh.scale.set(1.05, 1.05, 1.05);
        this.scene.add(this.uranus.atmosphereMesh);
    }

    setGeometry()
    {
        this.uranus.geometry = new SphereGeometry(4.01, 32, 32);
    }

    setMaterial()
    {
        this.uranus.material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTexture: new Uniform(this.textures.uranus),
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(this.atmosphereColor.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.atmosphereColor.atmosphereTwilightColor),
            }
        });
    }

    setMesh()
    {
        this.uranus.mesh = new Mesh(this.uranus.geometry, this.uranus.material);
    }

    setAtmosphereMaterial()
    {
        this.uranus.atmosphereMaterial = new ShaderMaterial({
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
        this.uranus.atmosphereMesh = new Mesh(this.uranus.geometry, this.uranus.atmosphereMaterial);
    }

    update()
    {
        /** Uranus Rotation */
        this.uranus.mesh.rotateY(0.0009320);

        /** Uranus Orbit Rotation */
        this.uranus.orbitAngle += this.uranus.orbitSpeed;
        this.uranus.mesh.position.x =
            -(this.uranus.orbitRadius * Math.cos(this.uranus.orbitAngle));
        this.uranus.mesh.position.z =
        this.uranus.orbitRadius * Math.sin(this.uranus.orbitAngle);

        this.uranus.material.uniforms.uSunDirection.value = this.uranus.mesh.getWorldPosition(this.uranus.mesh.position);

        this.uranus.atmosphereMesh.position.x =
            -(this.orbitRadius * Math.cos(this.orbitAngle));
        this.uranus.atmosphereMesh.position.z =
            this.orbitRadius * Math.sin(this.orbitAngle);

        this.uranus.atmosphereMaterial.uniforms.uSunDirection.value = this.uranus.atmosphereMesh.getWorldPosition(this.uranus.atmosphereMesh.position);
    }
}
