const VertexScroller = `
precision mediump float;
attribute float texIndex;

varying float textureIndex;
varying vec2 vUv;

void main() {
    textureIndex = texIndex;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4( position, 1.0 );
}
`;

export default VertexScroller;
