import { Scene, WebGLRenderer, PerspectiveCamera, Clock, PlaneBufferGeometry, ShaderMaterial, Mesh, Vector2 } from 'three';
import VertexNoise from '../shaders/vertexNoise';
import FragmentNoise from '../shaders/fragmentNoise';

export default class NoiseBackground {
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
            },
            u_resolution: {
                value: new Vector2()
            }
        }

        this.init();
    }

    init() {
        const geometry = new PlaneBufferGeometry(4, 4);
        const material = new ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: VertexNoise,
            fragmentShader: FragmentNoise,
            wireframe: false,
            transparent: true,
            fog: false
        });

        this.mesh = new Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.camera.position.z = 1;

        this.onResize();
        window.addEventListener('resize', this.onResize);

        this.loop();
    }

    onResize = () => {
        const width = document.documentElement.clientWidth;
        const height = window.innerHeight;

        this.resolution = { width: width, height: height };
        this.uniforms.u_resolution.value = new Vector2(width, height);

        this.renderer.setSize(width, height, true);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x121212, 1);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
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
