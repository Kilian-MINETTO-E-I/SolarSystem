/**
 * Imports
 */
// ThreeJs
import {
    DoubleSide,
    Mesh,
    RingGeometry,
    ShaderMaterial,
    Uniform,
    Vector3
} from 'three';

// Planet
import Planet from '../Planet';

// Shaders
import ringVertexShader from './shaders/rings/vertex.glsl';
import ringFragmentShader from './shaders/rings/fragment.glsl';

/**
 * class Saturn
 */
export default class Saturn extends Planet
{
    /** Saturn constructor */
    constructor()
    {
        super(
            24.57, // Planet Size
            0.0036840, // Planet Rotation Speed
            1.05, // Atmosphere Size Scale
            new Vector3(0, 0, 0), // Sun Direction
            '#EAD688', // Atmosphere Day Color
            '#CEB8B8', // Atmosphere Twilight Color
            0, // Clouds Intensity
        );

        /** Orbit Parameters */
        this.orbit.orbitRadius = 1433.5 / 4;
        this.orbit.orbitSpeed = 0.001;

        /** Ring Textures */
        this.ringTexture = this.resources.items.ringTexture;

        this._setTexture(
            this.resources.items.saturnTexture,
            this.defaultTexture,
            this.defaultTexture
        );

        this.setRingGeometry();
        this.setRingMaterial();
        this.setRingMesh();

        this.planet.ringMesh.rotation.x = -26;
        this.scene.add(this.planet.ringMesh);
    }

    setRingGeometry()
    {
        this.planet.ringGeometry = new RingGeometry(32, 40, 32, 3, Math.PI, Math.PI * 2);
    }

    setRingMaterial()
    {
        this.ringTexture.flipY = false;
        this.planet.ringMaterial = new ShaderMaterial({
            vertexShader: ringVertexShader,
            fragmentShader: ringFragmentShader,
            uniforms: {
                uTexture: new Uniform(this.ringTexture),
            },
            side: DoubleSide,
            transparent: true,
            depthWrite: false
        });
    }

    setRingMesh()
    {
        this.planet.ringMesh = new Mesh(this.planet.ringGeometry, this.planet.ringMaterial);
    }

    update()
    {
        /** Saturn rotation */
        this.planet.mesh.rotateY(0.0036840);

        /** Saturn ring rotation */
        this.planet.ringMesh.rotateZ(0.00367000);

        /** Saturn Orbit */
        this.orbit.orbitAngle += this.orbit.orbitSpeed;
        this.planet.mesh.position.x =
            -(this.orbit.orbitRadius * Math.cos(this.orbit.orbitAngle));
        this.planet.mesh.position.z =
        this.orbit.orbitRadius * Math.sin(this.orbit.orbitAngle);

        /** Saturn Ring Orbit */
        this.planet.ringMesh.position.x =
            -(this.orbit.orbitRadius * Math.cos(this.orbit.orbitAngle));
        this.planet.ringMesh.position.z =
        this.orbit.orbitRadius * Math.sin(this.orbit.orbitAngle);

        this.planet.material.uniforms.uSunDirection.value = this.planet.mesh.getWorldPosition(this.planet.mesh.position);

        this.atmosphere.mesh.position.x =
            -(this.orbit.orbitRadius * Math.cos(this.orbit.orbitAngle));
        this.atmosphere.mesh.position.z =
            this.orbit.orbitRadius * Math.sin(this.orbit.orbitAngle);

        this.atmosphere.material.uniforms.uSunDirection.value =
            this.atmosphere.mesh.getWorldPosition(this.atmosphere.mesh.position);
    }
}
