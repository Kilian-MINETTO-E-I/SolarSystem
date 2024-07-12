// Uniforms
uniform sampler2D uTexture;

// Varyings
varying vec2 vUv;
// Includes

// Functions

void main()
{
    vec3 color = vec3(0.0);

    // Day/Night Color
    float ringColor = texture(uTexture, vUv).r;

    gl_FragColor = vec4(1.0, 1.0, 1.0, ringColor);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
