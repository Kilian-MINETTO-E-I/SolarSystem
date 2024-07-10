// Uniforms
uniform float uTime;
uniform sampler2D uTexture;
uniform float uFrequency;

// Varyings
varying vec2 vUv;

// Includes
#include ../../shaders/includes/simplexNoise3D.glsl;

// Functions

void main()
{
    vec3 color = vec3(0.0);

    color = texture(uTexture, vUv).rgb;

    vec3 noises = vec3(
        simplexNoise3D(color * uFrequency + 0.0 * uTime),
        simplexNoise3D(color * uFrequency + 1.0 * uTime),
        0
    );

    color += noises.rgb;

    gl_FragColor = vec4(color, 1.);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}