const FragmentNoise = `
precision mediump float;
uniform vec2 u_resolution;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 st = (gl_FragCoord.xy - u_resolution) / min(u_resolution.x, u_resolution.y);

    float rnd = random( st );
    vec3 color = vec3(rnd);

    vec3 bg = hsv2rgb(vec3(0., 0., 0.130));

    gl_FragColor = vec4(color * bg, 0.4);
}
`;

export default FragmentNoise;
