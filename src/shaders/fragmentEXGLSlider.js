const FragmentEXGLSlider = `
precision mediump float;
uniform vec2 u_windowResolution;
uniform vec2 u_imageResolution;
uniform sampler2D u_texture;
varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min((u_windowResolution.x / u_windowResolution.y) / (u_imageResolution.x / u_imageResolution.y), 1.0),
    min((u_windowResolution.y / u_windowResolution.x) / (u_imageResolution.y / u_imageResolution.x), 1.0)
  );

  vec2 resizedUV = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  // resizedUV *= 5.0;

  // float _Scale = 1.5;

  // vec2 newUv = (vUv - 0.5) * _Scale + 0.5;

  gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * texture2D(u_texture, vUv);
}`;

export default FragmentEXGLSlider;
