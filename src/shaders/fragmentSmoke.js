const FragmentSmoke = `
precision highp float;
uniform float u_time;
uniform float u_ratio;
uniform vec2 u_resolution;

const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

mat2 rotation(float a) {
    return mat2( cos(a), -sin(a), sin(a), cos(a) );
}

float noise( in vec2 p ) {
    return sin(p.x) * sin(p.y);
}

// For mobile
highp float random(vec2 co){
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

// https://www.shadertoy.com/view/MsS3Wc
vec3 hsv2rgb_smooth( in vec3 c ) {
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
	rgb = rgb*rgb*(3.0-2.0*rgb); // cubic smoothing	
	return c.z * mix( vec3(1.0), rgb, c.y);
}

#define NUM_OCTAVES 5

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;

    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * (1.0 + noise(p));
        p = rotation(0.5) * p * vec2(1.5);
        a *= 0.5;
    }
    return v;
}

void main( void ) {

    vec2 p = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    vec2 s = vec2(0.0400, 0.1434);
    vec2 q = vec2(0.);
    q = q + s;
    q.x = fbm( (p * s) / 0.126);
    q.y = fbm( (p * s) / 0.589);

    vec2 r = vec2(0.);
    r.x = fbm( p + 10.0*q + vec2(1.0,9.2)+ 0.150 * u_time);
    r.y = fbm( p + 25.0*q + vec2(5.0,3.2)+ 0.126 * u_time);

    float f = fbm(p);

    vec3 col = vec3(0.0);
    col = mix(
            hsv2rgb_smooth(vec3(0.5870,0.6087,0.2065)),
            hsv2rgb_smooth(vec3(0.4565,0.7283,0.9348)), 
        f);

    col = mix(col,
            hsv2rgb_smooth(vec3(0.4913,0.5000,0.9022)),
            // clamp(length(r.x),0.0,1.0)
            dot(q.x, q.y)
            );

    col = mix(col,
                vec3(0,0.1,0.164706),
                // clamp(length(r),0.0,1.0)
                dot(r.x,r.y)
                );
    
    col = clamp( col*f*0.574, 0.0, 1.0 );

    gl_FragColor = vec4(col, 1.);
}
`;

export default FragmentSmoke;
