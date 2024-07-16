// Uniforms
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDay;
uniform vec3 uAtmosphereTwilight;

// Varyings
varying vec3 vNormal;
varying vec3 vPosition;

// Includes

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // Sun Direction
    float sunOrientation = dot(-uSunDirection, normal);

    // Atmosphere
    float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilight, uAtmosphereDay, atmosphereDayMix);
    color += atmosphereColor;

    // Alpha
    float edgeAlpha = dot(viewDirection, normal);
    edgeAlpha = smoothstep(0.0, 0.5, edgeAlpha);

    float dayAlpha = smoothstep(-0.5, 0.0, sunOrientation);
    float alpha = edgeAlpha * dayAlpha;

    // Final color
    gl_FragColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
