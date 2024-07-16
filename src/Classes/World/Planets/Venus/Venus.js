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
import Experience from '../.././../Experience';

// Shaders
import vertexShader from './shaders/venus/vertex.glsl';
import fragmentShader from './shaders/venus/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphere/vertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphere/fragment.glsl';

/**
 * class Venus
 */
export default class Venus
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
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.sunPosition = sunPosition;

        this.venus = {
            orbitRadius: this.orbitRadius,
            orbitAngle: 0,
            orbitSpeed: this.orbitSpeed
        };

        /** Texture */
        this.textures = {
            venusTexture: this.resources.items.venusTexture,
            venusAtmosphere: this.resources.items.venusAtmosphere,
            atmosphereDayColor: new Color('#dd9900'),
            atmosphereTwilightColor: new Color('#dd3300'),
        };

        /** Functions */
        // Venus
        this.setGeometry();
        this.setVenusColorMaterial();
        this.setVenusAtmosphereMaterial();
        this.setMesh();

        this.venus.atmosphereMesh.scale.set(1.015, 1.015, 1.015);

        this.scene.add(this.venus.mesh);
        this.scene.add(this.venus.atmosphereMesh);
    }

    setGeometry()
    {
        this.venus.geometry = new SphereGeometry(2.4674, 32, 32);
    }

    setVenusColorMaterial()
    {
        this.venus.material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uVenusTexture: new Uniform(this.textures.venusTexture),
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(this.textures.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.textures.atmosphereTwilightColor)
            }
        });
    }

    setVenusAtmosphereMaterial()
    {
        this.venus.atmosphereMaterial = new ShaderMaterial({
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            uniforms: {
                uVenusAtmosphereTexture: new Uniform(this.textures.venusAtmosphere),
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(this.textures.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.textures.atmosphereTwilightColor)
            },
            transparent: true,
        });
    }

    setMesh()
    {
        this.venus.mesh = new Mesh(this.venus.geometry, this.venus.material);
        this.venus.atmosphereMesh = new Mesh(this.venus.geometry, this.venus.atmosphereMaterial);
    }

    update()
    {
        /** Venus Rotation */
        this.venus.mesh.rotateY(-0.00011675);
        this.venus.atmosphereMesh.rotateY(-0.0011675);

        /** Venus Orbit */
        this.venus.orbitAngle += this.venus.orbitSpeed;
        this.venus.mesh.position.x =
            -(this.venus.orbitRadius * Math.cos(this.venus.orbitAngle));
        this.venus.mesh.position.z =
            this.venus.orbitRadius * Math.sin(this.venus.orbitAngle);

        this.venus.material.uniforms.uSunDirection.value = this.venus.mesh.getWorldPosition(this.venus.mesh.position);

        this.venus.atmosphereMesh.position.x =
            -(this.venus.orbitRadius * Math.cos(this.venus.orbitAngle));
        this.venus.atmosphereMesh.position.z =
            this.venus.orbitRadius * Math.sin(this.venus.orbitAngle);

        this.venus.atmosphereMaterial.uniforms.uSunDirection.value = this.venus.atmosphereMesh.getWorldPosition(this.venus.atmosphereMesh.position);
    }
}