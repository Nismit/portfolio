const VertexEXGLSlider = `
precision mediump float;
uniform vec2 u_windowResolution;
uniform vec2 u_imageResolution;
// uniform vec2 uMeshScale;
// uniform vec2 uMeshPosition;
varying vec2 vUv;

void main() {
    vec3 newPosition = position;

    // Scale to page view size/page size
	// vec2 scaleToViewSize = uViewSize / u_windowResolution - 1.;
    // vec2 scale = vec2(1. + scaleToViewSize * uProgress);
    // newPosition.xy *= scale;

    // Move towards center
    // newPosition.y += -uMeshPosition.y * uProgress;
    // newPosition.x += -uMeshPosition.x * uProgress;

    vec2 ratio = vec2(
        min((u_windowResolution.x / u_windowResolution.y) / (u_imageResolution.x / u_imageResolution.y), 1.0),
        min((u_windowResolution.y / u_windowResolution.x) / (u_imageResolution.y / u_imageResolution.x), 1.0)
    );

    float scale = 0.5;

    mat4 sPos = mat4(vec4(scale,0.0,0.0,0.0),
                    vec4(0.0,scale,0.0,0.0),
                    vec4(0.0,0.0,0.0,0.0),
                    vec4(0.0,0.0,0.0,1.0)
                );

    // newPosition.xy *= 0.5;

    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
`;

export default VertexEXGLSlider;
