/**
 * Imports
 */
// ThreeJs
import {
    Color,
    DoubleSide,
    Mesh,
    MeshStandardMaterial,
    RingGeometry,
    ShaderMaterial,
    SphereGeometry,
    Uniform,
    Vector3
} from "three";

// Experience
import Experience from "../../../Experience";

// Shaders
import saturnVertexShader from './shaders/saturn/vertex.glsl';
import saturnFragmentShader from './shaders/saturn/fragment.glsl';
import ringVertexShader from './shaders/rings/vertex.glsl';
import ringFragmentShader from './shaders/rings/fragment.glsl';

/**
 * class Saturn
 */
export default class Saturn
{
    /** Saturn constructor */
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
            saturn: this.resources.items.saturnTexture,
            ring: this.resources.items.ringTexture
        };

        /** Atmosphere */
        this.atmosphereColor = {
            atmosphereDayColor: new Color('#EAD6B8'),
            atmosphereTwilightColor: new Color('#CEB8B8')
        };

        /** Planet */
        this.saturn = {
            orbitRadius: this.orbitRadius,
            orbitAngle: 0,
            orbitSpeed: this.orbitSpeed,
            ringOrbitRadius: this.orbitRadius,
            ringOrbitAngle: 0,
            ringOrbitSpeed: this.orbitSpeed,
        };

        this.setSaturnGeometry();
        this.setSaturnMaterial();
        this.setSaturnMesh();
        this.setRingGeometry();
        this.setRingMaterial();
        this.setRingMesh();

        this.scene.add(this.saturn.mesh);

        this.saturn.ringMesh.rotation.x = -26;
        this.scene.add(this.saturn.ringMesh);
    }

    setSaturnGeometry()
    {
        this.saturn.geometry = new SphereGeometry(9.45, 32, 32);
    }

    setSaturnMaterial()
    {
        this.saturn.material = new ShaderMaterial({
            vertexShader: saturnVertexShader,
            fragmentShader: saturnFragmentShader,
            uniforms: {
                uTexture: new Uniform(this.textures.saturn),
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(this.atmosphereColor.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.atmosphereColor.atmosphereTwilightColor),
            }
        });
    }

    setSaturnMesh()
    {
        this.saturn.mesh = new Mesh(this.saturn.geometry, this.saturn.material);
    }

    setRingGeometry()
    {
        this.saturn.ringGeometry = new RingGeometry(16, 20, 32, 3, Math.PI, Math.PI * 2);
    }

    setRingMaterial()
    {
        this.textures.ring.flipY = false;
        this.saturn.ringMaterial = new ShaderMaterial({
            vertexShader: ringVertexShader,
            fragmentShader: ringFragmentShader,
            uniforms: {
                uTexture: new Uniform(this.textures.ring),
            },
            side: DoubleSide,
            transparent: true,
            depthWrite: false
        });
    }

    setRingMesh()
    {
        this.saturn.ringMesh = new Mesh(this.saturn.ringGeometry, this.saturn.ringMaterial);
    }

    update()
    {
        /** Saturn rotation */
        this.saturn.mesh.rotateY(0.0036840);

        /** Saturn ring rotation */
        this.saturn.ringMesh.rotateZ(0.00367000);

        /** Saturn Orbit */
        this.saturn.orbitAngle += this.saturn.orbitSpeed;
        this.saturn.mesh.position.x =
            -(this.saturn.orbitRadius * Math.cos(this.saturn.orbitAngle));
        this.saturn.mesh.position.z =
        this.saturn.orbitRadius * Math.sin(this.saturn.orbitAngle);

        /** Saturn Orbit */
        this.saturn.ringOrbitAngle += this.saturn.ringOrbitSpeed;
        this.saturn.ringMesh.position.x =
            -(this.saturn.ringOrbitRadius * Math.cos(this.saturn.ringOrbitAngle));
        this.saturn.ringMesh.position.z =
        this.saturn.ringOrbitRadius * Math.sin(this.saturn.ringOrbitAngle);

        this.saturn.material.uniforms.uSunDirection.value = this.saturn.mesh.getWorldPosition(this.saturn.mesh.position);
    }
}
