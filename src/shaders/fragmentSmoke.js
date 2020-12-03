const FragmentSmoke = `
precision highp float;
uniform float u_time;
uniform float u_ratio;
uniform vec2 u_resolution;

// const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );
const mat2 m = mat2( 5.0,  1.0, 1.0,  1.0 );
// const mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// float noise( in vec2 p ) {
//     return sin(p.x)*sin(p.y);
// }

float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 6

float fbm( in vec2 x ) {
    float G = exp2(-1.0);
    float f = 1.0;
    float a = 1.0;
    float t = 0.0;
    for(int i = 0; i < NUM_OCTAVES; i++ ) {
        // t += a * noise(x);
        t += a * noise(f*x);
        // x = m*x*2.01;
        f *= 2.0;
        a *= G;
    }
    return t;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // st += st * abs(sin(u_time*0.1)*3.0);
    vec3 color = vec3(0.);

    vec2 q = vec2(0.);
    q.x = fbm( st + 0.0 * u_time);
    q.y = fbm( st + vec2(0.85432));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.015  * u_time );
    r.y = fbm( st + 1.0*q + vec2(1.3,2.8)+ 0.0526 * u_time );

    float f = fbm(st+r);
    vec4 on = vec4(0.0);

    // color = mix(hsv2rgb(vec3(0., 0., 0.130)),
    //             hsv2rgb(vec3(0.5591, 0.6458, 0.1882)),
    //             clamp((f*f)*2.0, 0.0, 1.0));

    color = mix(hsv2rgb(vec3(0., 0., 0.130)),
                hsv2rgb(vec3(0.593, 0.5, 0.08)),
                clamp((f*f)*2.0, 0.0, 1.0));

    color = mix(color,
                hsv2rgb(vec3(0.3, 0.2, 0.1)),
                clamp(length(q), 0.0, 1.0));

    color = mix(color,
                hsv2rgb(vec3(0.58, 0.5, 0.1)),
                clamp(length(r.x), 0.0, 1.0));

    // color = mix(hsv2rgb(vec3(0., 0., 0.130)),
    //             hsv2rgb(vec3(0.5591, 0.6458, 0.1882)),
    //             f);

    // color = mix(color,
    //             hsv2rgb(vec3(0.6400,0.4630,0.2118)),
    //             dot(r.x,r.y));

    // color = mix(color,
    //             hsv2rgb(vec3(0.6400,0.4630,0.2118)),
    //             clamp((f*f)*4.0, 0.0, 1.0));

    // color = mix(color,
    //             hsv2rgb(vec3(0.5505,0.5156,0.2510)),
    //             clamp((f*f)*0.89, 0.0, 1.0));

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f) * color, .8);
}
`;

export default FragmentSmoke;
