const FragmentSmoke = `
precision mediump float;
uniform float u_time;
varying vec3 vUv;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec3 position = normalize(vUv);
    vec3 rgb = hsv2rgb(vec3( (sin(0.0003 * u_time) + (position.x + position.y) / 9.0) , 0.7, 0.4));
    gl_FragColor = vec4( rgb, 1.0 );
}
`;

export default FragmentSmoke;
