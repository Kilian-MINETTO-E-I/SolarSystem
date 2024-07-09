// Uniforms
uniform sampler2D uDayColor;
uniform sampler2D uNightColor;
uniform sampler2D uCloudsTexture;
uniform float uCloudsIntensity;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDay;
uniform vec3 uAtmosphereTwilight;
uniform float uSpecularIntensity;

// Varyings
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// Includes

// Functions

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // Sun Direction
    float sunOrientation = -dot(uSunDirection, normal);

    // Day/Night Color
    float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
    vec3 dayColor = texture(uDayColor, vUv).rgb;
    vec3 nightColor = texture(uNightColor, vUv).rgb;

    color = mix(nightColor, dayColor, dayMix);

    // Clouds
    vec2 specularCloudsColor = texture(uCloudsTexture, vUv).rg;
    float cloudsMix = smoothstep(1.0 - uCloudsIntensity, 1.0, specularCloudsColor.g);
    cloudsMix *= dayMix;
    color = mix(color, vec3(1.0), cloudsMix);

    // Fresnel
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 3.0);

    // Atmosphere
    float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilight, uAtmosphereDay, atmosphereDayMix);
    color = mix(color, atmosphereColor, fresnel * atmosphereDayMix);

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
