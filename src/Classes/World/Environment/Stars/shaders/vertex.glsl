// Uniforms
uniform float uTime;
uniform float uSize;
uniform vec2 uResolution;

// Attributes
attribute float aSize;

// Varyings

// Includes

// Functions

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.);

    /**
     *  Animate Particles
     */
    float particlesAngle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.x);
    float offsetAngle = (1.0 / distanceToCenter) * uTime ;
    particlesAngle += offsetAngle;

    modelPosition.x = cos(particlesAngle) * distanceToCenter;
    modelPosition.z = sin(particlesAngle) * distanceToCenter;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    // Final size
    gl_PointSize = uSize * uResolution.y * aSize;
    gl_PointSize *= (1.0 / -viewPosition.z);

    if (gl_PointSize < 1.0) {
        gl_Position = vec4(999.9);
    }
}
