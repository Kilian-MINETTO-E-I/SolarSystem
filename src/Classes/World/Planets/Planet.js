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
import Experience from "../../Experience";

// Shaders
import planetVertexShader from './shaders/planet/vertex.glsl';
import planetFragmentShader from './shaders/planet/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphere/vertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphere/fragment.glsl';

/**
 * class Planet
 */
export default class Planet
{
    /** Planet constructor */
    constructor(
        planetSize,
        planetRotationSpeed,
        atmosphereSizeScale,
        sunDirection,
        atmosphereDayColor,
        atmosphereTwilightColor,
        cloudsIntensity,
    )
    {
        /** Setup */
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.planet = {};
        this.atmosphere = {};
        this.orbit = {
            earth: {},
            moon: {},
            orbitAngle: 0
        };

        /** Properties */
        this.planetSize = planetSize;
        this.planetRotationSpeed = planetRotationSpeed;
        this.atmosphereSizeScale = atmosphereSizeScale;
        this.sunDirection = sunDirection;
        this.atmosphereDayColor = atmosphereDayColor;
        this.atmosphereTwilightColor = atmosphereTwilightColor;
        this.cloudsIntensity = cloudsIntensity;
        this.defaultTexture = new Vector3(0, 0, 0);

        this.setPlanetGeometry();
        this.setPlanetMaterial();
        this.setPlanetMesh();
        this.setAtmosphereMaterial();
        this.setAtmosphereMesh();

        this.scene.add(this.planet.mesh);
        this.scene.add(this.atmosphere.mesh);
    }

    setPlanetGeometry()
    {
        this.planet.geometry = new SphereGeometry(this.planetSize, 32, 32);
    }

    setPlanetMaterial()
    {
        this.planet.material = new ShaderMaterial({
            vertexShader: planetVertexShader,
            fragmentShader: planetFragmentShader,
            uniforms: {
                uDayColor: new Uniform(new Vector3(0, 0, 0)),
                uNightColor: new Uniform(new Vector3(0, 0, 0)),
                uCloudsTexture: new Uniform(new Vector3(0, 0, 0)),
                uCloudsIntensity: new Uniform(this.cloudsIntensity),
                uSunDirection: new Uniform(this.sunDirection)
            }
        });
    }

    setPlanetMesh()
    {
        this.planet.mesh = new Mesh(this.planet.geometry, this.planet.material)
    }

    setAtmosphereMaterial()
    {
        this.atmosphere.material = new ShaderMaterial({
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            uniforms: {
                uSunDirection: new Uniform(this.sunDirection),
                uAtmosphereDayColor: new Uniform(new Color(this.atmosphereDayColor)),
                uAtmosphereTwilightColor: new Uniform(new Color(this.atmosphereTwilightColor))
            },
            side: BackSide,
            transparent: true
        });
    }

    setAtmosphereMesh()
    {
        this.atmosphere.mesh = new Mesh(this.planet.geometry, this.atmosphere.material);
        this.atmosphere.mesh.scale.set(
            this.atmosphereSizeScale, this.atmosphereSizeScale, this.atmosphereSizeScale
        );
    }

    _setTexture(textureDay, textureNight, cloudsTexture)
    {
        this.planet.material.uniforms.uDayColor.value = textureDay;
        this.planet.material.uniforms.uNightColor.value = textureNight;
        this.planet.material.uniforms.uCloudsTexture.value = cloudsTexture;
    }

    update()
    {
        /** Planet rotation */
        this.planet.mesh.rotateY(this.planetRotationSpeed);

        /** Planet orbit */
        this.orbit.orbitAngle += this.orbit.orbitSpeed;

        this.planet.mesh.position.x =
            -(this.orbit.orbitRadius * Math.cos(this.orbit.orbitAngle));
        this.planet.mesh.position.z =
            this.orbit.orbitRadius * Math.sin(this.orbit.orbitAngle);

        /** Planet Sun Direction */
        this.planet.material.uniforms.uSunDirection.value =
            this.planet.mesh.getWorldPosition(this.planet.mesh.position);

        /** Atmosphere orbit */
        this.atmosphere.mesh.position.x =
            -(this.orbit.orbitRadius * Math.cos(this.orbit.orbitAngle));
        this.atmosphere.mesh.position.z =
            this.orbit.orbitRadius * Math.sin(this.orbit.orbitAngle);

        /** Planet Sun Direction */
        this.atmosphere.material.uniforms.uSunDirection.value =
            this.atmosphere.mesh.getWorldPosition(this.atmosphere.mesh.position);
    }
}
