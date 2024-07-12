// Uniforms
uniform sampler2D uTexture;

// Varyings

// Includes

// Functions

void main()
{
    float alpha = texture(uTexture, gl_PointCoord).r;

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
