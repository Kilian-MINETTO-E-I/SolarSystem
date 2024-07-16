// Uniforms

// Attributes

// Varyings
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// Includes

// Functions

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    // Model Normal
    vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

    vUv = uv;
    vNormal = modelNormal;
    vPosition = modelPosition.xyz;
}
