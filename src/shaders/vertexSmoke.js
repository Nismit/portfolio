const VertexSmoke = `
precision mediump float;
uniform float u_time;
varying vec3 vUv;

void main() {
    vec3 updatedPosition;
    float pos1 = sin((position.x + position.y + u_time) * 0.12 );
    float pos2 = sin((position.x - position.y + u_time) * 0.14 );
    float pos3 = sin((position.x + position.y + u_time) * -0.8 );
    float pos4 = sin(u_time * -0.8 );
    // updatedPosition = vec3(position.x, position.y, position.z + pos1 * 28.0 + pos2 * 26.0 + pos3 * 10.0);
    updatedPosition = vec3(position.x, position.y, position.z);

    vUv = position;
    gl_PointSize = 1.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( updatedPosition, 1.0 );
    // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export default VertexSmoke;
