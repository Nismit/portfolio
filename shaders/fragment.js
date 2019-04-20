const Fragment = `
uniform float time;
uniform sampler2D pallete;
varying float vDisplace;

void main(){
  vec2 stripPos = vec2( 0.0, vDisplace );
  vec4 stripColor = texture2D( pallete, stripPos );
  stripColor *= pow(1.0 - vDisplace, 1.0);

  gl_FragColor = stripColor;
}`;

export default Fragment