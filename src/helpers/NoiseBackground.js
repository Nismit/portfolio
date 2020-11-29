import { Scene, WebGL1Renderer, PerspectiveCamera, Clock, PlaneBufferGeometry, RawShaderMaterial, Mesh, Vector2 } from 'three';
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
        this.renderer = new WebGL1Renderer({ antialias: true });
        this.camera = new PerspectiveCamera(60, 1 / 1, .1, 1000);

        this.uniforms = {
            u_resolution: {
                value: new Vector2()
            },
            u_ratio: {
                value: 1.0
            }
        }

        this.init();
    }

    init() {
        const geometry = new PlaneBufferGeometry(4, 4);
        const material = new RawShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: VertexNoise,
            fragmentShader: FragmentNoise,
            transparent: true
        });

        this.mesh = new Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.camera.position.z = 1;

        this.onResize();
        window.addEventListener('resize', this.onResize);

        // this.loop();
        this.drawOnce();
    }

    onResize = () => {
        const width = document.documentElement.clientWidth;
        const height = window.innerHeight;

        this.resolution = { width: width, height: height };
        this.uniforms.u_resolution.value = new Vector2(width, height);
        this.uniforms.u_ratio.value = window.devicePixelRatio.toFixed(1);

        this.renderer.setSize(width, height, true);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x121212, 1);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.drawOnce();
    }

    loop() {
        if (!this.frameId) {
            this.clock.start();
            this.frameId = requestAnimationFrame(this.draw);
        }
    }

    draw = () => {
        this.renderer.render(this.scene, this.camera);
        this.frameId = window.requestAnimationFrame(this.draw);
    }

    drawOnce = () => {
        this.renderer.render(this.scene, this.camera);
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    destroy() {
        // cancelAnimationFrame(this.frameId);
        window.removeEventListener('resize', this.onResize);
    }
}
