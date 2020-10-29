const VertexGLSlider = `
precision mediump float;
uniform float uVelo;
varying vec2 vUv;
#define M_PI 3.1415926535897932384626433832795

void main(){
  vec3 pos = position;
  pos.x = pos.x + ((sin(uv.y * M_PI) * uVelo) * 0.125);

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
}
`

export default VertexGLSlider;
