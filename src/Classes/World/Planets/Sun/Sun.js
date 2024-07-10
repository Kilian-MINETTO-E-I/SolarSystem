/**
 * Import
 */
// ThreeJs
import {
    Mesh,
    ShaderMaterial,
    SphereGeometry,
    Uniform
} from 'three';

// Experience
import Experience from '../../../Experience';

// Shaders
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

/**
 * class Sun
 */
export default class Sun
{
    constructor()
    {
        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        // Textures
        this.textures = {
            sun: this.resources.items.sunTexture
        };

        this.sun = {
            noiseSpeed: 0.1
        };

        // Functions
        this.setGeometry();
        this.setMaterial();
        this.setMesh();

        this.scene.add(this.sun.mesh);
    }

    setGeometry()
    {
        this.sun.geometry = new SphereGeometry(10.9, 32, 32);
    }

    setMaterial()
    {
        this.sun.material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: new Uniform(this.time.elapsedTime),
                uTexture: new Uniform(this.textures.sun),
                uFrequency: new Uniform(Math.random())
            }
        });
    }

    setMesh()
    {
        this.sun.mesh = new Mesh(this.sun.geometry, this.sun.material);
    }

    update()
    {
        /** Sun Rotation */
        this.sun.mesh.rotateY(0.04400);

        // Update Time
        this.sun.material.uniforms.uTime.value += Math.sin(this.sun.noiseSpeed / 100) * -(Math.cos(this.sun.noiseSpeed / 100));
    }
}
