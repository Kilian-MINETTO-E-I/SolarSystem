/**
 * Imports
 */
// ThreeJs
import {
    AdditiveBlending,
    BufferGeometry,
    Float32BufferAttribute,
    Points,
    ShaderMaterial,
    Spherical,
    Uniform,
    Vector2,
    Vector3
} from "three";

// Experience
import Experience from "../../../Experience";

// Shaders
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

/**
 * class Stars
 */
export default class Stars
{
    constructor()
    {
        /** Setup */
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.sizes = this.experience.sizes;
        this.time = this.experience.time;
        this.stars = {
            speed: -0.04
        };

        /** Textures */
        this.textures = {
            stars: this.resources.items.starsTexture
        }

        this.setGeometry();
        this.setStarsParams();
        this.setMaterial();
        this.setPoints();

        this.scene.add(this.stars.points);
    }

    setGeometry()
    {
        this.stars.geometry = new BufferGeometry();
    }

    setStarsParams()
    {
        const count = 5000;
        const positionArray = new Float32Array(count * 3);
        const pointSize = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            const radius = 0.5 + Math.random();

            const spherical = new Spherical(
                radius * (0.75 + Math.random() * 500),
                Math.random() * Math.PI,
                Math.random() * Math.PI * 2
            );
            const position = new Vector3();
            position.setFromSpherical(spherical);

            positionArray[i3 + 0] = position.x * 3;
            positionArray[i3 + 1] = Math.random() * position.y;
            positionArray[i3 + 2] = position.z;

            pointSize[i] = Math.random();
        }

        this.stars.geometry.setAttribute('position', new Float32BufferAttribute(positionArray, 3));
        this.stars.geometry.setAttribute('aSize', new Float32BufferAttribute(pointSize, 1));
    }

    setMaterial()
    {
        this.textures.stars.flipY = false;
        this.stars.material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: new Uniform(0),
                uSize: new Uniform(3 + Math.random() * 3),
                uResolution: new Uniform(
                    new Vector2(
                        this.sizes.width * this.sizes.pixelRatio,
                        this.sizes.height * this.sizes.pixelRatio
                    )
                ),
                uTexture: new Uniform(this.textures.stars),
            },
            transparent: true,
            depthWrite: false,
            blending: AdditiveBlending
        });
    }

    setPoints()
    {
        this.stars.points = new Points(this.stars.geometry, this.stars.material);
    }

    update()
    {
        this.stars.material.uniforms.uTime.value += this.stars.speed;
    }
}