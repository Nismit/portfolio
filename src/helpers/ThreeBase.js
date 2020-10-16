import * as THREE from 'three';
import Vertex from '../shaders/vertex';
import Fragment from '../shaders/fragment';

export default class ThreeBase {
    constructor() {
        this.mesh = null;
        this.frameId = null;
        this.texture = null;
        this.resolution = null;
        this.scene = new Scene();
        this.clock = new Clock({ autoStart: false });
        this.renderer = new WebGLRenderer({ antialias: true });
        this.camera = new PerspectiveCamera(60, 1 / 1, .1, 1000);

        this.uniforms = {
            u_time: {
                value: 0.0
            }
        }

        this.init();
    }

    init() {
        const geometry = new PlaneBufferGeometry(100, 50, 100, 100);
        const material = new ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: VertexSmoke,
            fragmentShader: FragmentSmoke,
            wireframe: true,
            fog: false
        });

        this.mesh = new Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.onResize();
        window.addEventListener('resize', this.onResize);

        this.loop();
    }

    onResize = () => {
        const width = document.documentElement.clientWidth;
        const height = window.innerHeight;

        this.resolution = { width: width, height: height };

        this.renderer.setSize(width, height, true);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x121212, 1);

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

    loop() {
        if (!this.frameId) {
            this.clock.start();
            this.frameId = requestAnimationFrame(this.draw);
        }
    }

    draw = () => {
        const time = this.clock.getDelta();
        this.uniforms.u_time.value += time;

        this.renderer.render(this.scene, this.camera);
        this.frameId = window.requestAnimationFrame(this.draw);
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    destroy() {
        cancelAnimationFrame(this.frameId);
        window.removeEventListener('resize', this.onResize);
    }
}
