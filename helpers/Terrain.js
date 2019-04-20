import * as THREE from 'three';
import Vertex from '../shaders/vertex';
import Fragment from '../shaders/fragment';

export default class Terrain {
  constructor() {
    this.obj = null;
    this.texture = null;

    this.uniforms = {
      time: {
        value: 0.0
      },
      roadWidth: {
        value: 2.1
      },
      pallete: {
        value: null
      },
      speed: {
        value: 0.5
      },
      maxHeight: {
        value: 8.0
      }
    }
  }

  init() {
    const geometry = new THREE.PlaneBufferGeometry(100, 400, 100, 100);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: Vertex,
      fragmentShader: Fragment,
      wireframe: false,
      fog: false
    });

    this.obj = new THREE.Mesh(geometry, material);
    this.obj.position.z = -180;
    this.obj.rotation.x = -Math.PI / 2;
  }

  textureLoad(src = '/static/three-palette-2.png') {
    this.texture = new THREE.TextureLoader().load(src,
      function (texture) {
        texture.needsUpdate = true;
        return texture;
      },

      function (err) {
        console.error('An error happened');
        return null;
      }
    );

    if (this.texture !== null) {
      this.uniforms.pallete.value = this.texture;
    } else {
      return null;
    }
  }

  render(time) {
    this.uniforms.time.value += time;
  }
}