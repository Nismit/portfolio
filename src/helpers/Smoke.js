import * as THREE from 'three';
import Vertex from '../shaders/vertex';
import Fragment from '../shaders/fragment';

export default class Smoke {
    constructor() {
        this.mesh = null;
        this.frameId = null;
        this.texture = null;
        this.resolution = null;
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock({ autoStart: false });
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = new THREE.PerspectiveCamera(60, 1 / 1, .1, 10000);
    }

    init() {
        // const geometry = new THREE.PlaneBufferGeometry(100, 400, 100, 100);
        // const material = new THREE.ShaderMaterial({
        //     uniforms: this.uniforms,
        //     vertexShader: Vertex,
        //     fragmentShader: Fragment,
        //     wireframe: false,
        //     fog: false
        // });

        // this.obj = new THREE.Mesh(geometry, material);
        // this.obj.position.z = -180;
        // this.obj.rotation.x = -Math.PI / 2;
    }

    onResize(resolution) {
        const width = resolution.width;
        const height = resolution.height;

        this.resolution = resolution;

        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    textureLoad(src = '/three-palette-9.png') {
        this.texture = new THREE.TextureLoader().load(src,
            function (texture) {
                texture.needsUpdate = true;
                return texture;
            },

            function (err) {
                console.error('An error happened: ', err);
                return null;
            }
        );

        if (this.texture !== null) {
            // this.uniforms.pallete.value = this.texture;
        } else {
            return null;
        }
    }

    render(time) {
        // this.uniforms.time.value += time;
    }

    loop() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.draw);
        }
    }

    draw() {
        // const time = this.clock.getDelta();
        // obj.render(time);

        this.renderer.render(this.scene, this.camera);
        this.frameId = window.requestAnimationFrame(this.draw);
    }

    destroy() {

    }
}
