import { Scene, WebGLRenderer, PerspectiveCamera, Clock, PlaneBufferGeometry, ShaderMaterial, Mesh, SpotLight, SpotLightHelper } from 'three';
import VertexSmoke from '../shaders/vertexSmoke';
import FragmentSmoke from '../shaders/fragmentSmoke';

export default class Smoke {
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
        const geometry = new PlaneBufferGeometry(100, 40, 100, 60);
        const material = new ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: VertexSmoke,
            fragmentShader: FragmentSmoke,
            wireframe: true,
            fog: false
        });

        this.mesh = new Mesh(geometry, material);
        this.mesh.position.z = -10;
        this.mesh.rotation.x = -88 * Math.PI / 180;
        this.scene.add(this.mesh);

        const spotLight = new SpotLight( 0xffffff, 1 );
        spotLight.position.set( 0, 20, 10 );
        // spotLight.angle = Math.PI / 4;
        spotLight.angle = Math.PI / 2;
        spotLight.penumbra = 0.1;
        spotLight.decay = 2;
        spotLight.distance = 10;

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 256;
        spotLight.shadow.mapSize.height = 256;
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 100;
        spotLight.shadow.focus = 1;
        this.scene.add( spotLight );
        const lightHelper = new SpotLightHelper( spotLight );
        this.scene.add( lightHelper );

        this.camera.position.z = 130;

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
