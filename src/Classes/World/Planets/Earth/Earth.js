/**
 * Imports
 */
// ThreeJS
import {
    Mesh,
    ShaderMaterial,
    Uniform,
    Vector3,
    Color,
    BackSide,
    SphereGeometry,
} from "three";

// Experience
import Experience from "../../../Experience";

// Shaders
import earthVertexShader from './shaders/earth/vertex.glsl';
import earthFragmentShader from './shaders/earth/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphere/vertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphere/fragment.glsl';

/**
 * class Earth
 */
export default class Earth
{
    /** Earth constructor */
    constructor()
    {
        // Setup
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Earth
        this.planet = {
            geometry: null,
            earthMaterial: null,
            earthMesh: null,
            atmosphereMaterial: null,
            atmosphereMesh: null
        };

        // Textures
        this.textures = {
            earthDayTexture: this.resources.items.earthDayTexture,
            earthNightTexture: this.resources.items.earthNightTexture,
            earthCloudsTexture: this.resources.items.earthCloudsTexture
        };

        // Atmosphere Color
        this.atmosphereColor = {
            atmosphereDayColor: new Color("#00AAFF"),
            atmosphereTwilightColor: new Color("#FF6600")
        };

        // Functions
        this.setGeometry();
        this.setEarthMaterial();
        this.setAtmosphereMaterial();
        this.setEarthMesh();
        this.setAtmosphereMesh();

        this.planet.atmosphereMesh.scale.set(1.015, 1.015, 1.015);
        this.planet.earthMesh.rotateZ(-0.235);
    }

    setGeometry()
    {
        this.planet.geometry = new SphereGeometry(1, 32, 32);
    }

    setEarthMaterial()
    {
        this.planet.earthMaterial = new ShaderMaterial({
            vertexShader: earthVertexShader,
            fragmentShader: earthFragmentShader,
            uniforms: {
                uDayColor: new Uniform(this.textures.earthDayTexture),
                uNightColor: new Uniform(this.textures.earthNightTexture),
                uCloudsTexture: new Uniform(this.textures.earthCloudsTexture),
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uCloudsIntensity: new Uniform(1),
                uAtmosphereDay: new Uniform(this.atmosphereColor.atmosphereDayColor),
                uAtmosphereTwilight: new Uniform(this.atmosphereColor.atmosphereTwilightColor),
                uSpecularIntensity: new Uniform(32),
            }
        });
    }

    setAtmosphereMaterial()
    {
        this.planet.atmosphereMaterial = new ShaderMaterial({
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            uniforms: {
                uSunDirection: new Uniform(new Vector3(0, 0, 0)),
                uAtmosphereDay: new Uniform(new Color(this.atmosphereColor.atmosphereDayColor)),
                uAtmosphereTwilight: new Uniform(new Color(this.atmosphereColor.atmosphereTwilightColor)),
            },
            side: BackSide,
            transparent: true,
        });
    }

    setEarthMesh()
    {
        this.planet.earthMesh = new Mesh(this.planet.geometry, this.planet.earthMaterial);
    }

    setAtmosphereMesh()
    {
        this.planet.atmosphereMesh = new Mesh(this.geometry, this.planet.atmosphereMaterial);
    }
}
