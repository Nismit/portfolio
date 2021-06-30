const VertexSmoke = `
precision highp float;

attribute vec2 uv;
attribute vec3 position;

void main() {
    gl_Position = vec4( position, 1.0 );
}
`;

export default VertexSmoke;
