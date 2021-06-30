const FragmentScroller = `
precision mediump float;
uniform float u_time;
uniform sampler2D u_texture[4];

varying float textureIndex;
varying vec2 vUv;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  if(textureIndex > 1.0) {
    gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * texture2D(u_texture[0], vUv);
  } else if (textureIndex > 2.0) {
    gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * texture2D(u_texture[1], vUv);
  } else {
    gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * texture2D(u_texture[2], vUv);
  }

}`;

export default FragmentScroller;
