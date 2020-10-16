import { Scene, WebGLRenderer, PerspectiveCamera, Clock, BoxBufferGeometry, MeshNormalMaterial, Mesh, InstancedMesh, Object3D } from 'three';
import Vertex from '../shaders/vertex';
import Fragment from '../shaders/fragment';

export default class Scroller {
    constructor() {
        this.mesh = null;
        this.frameId = null;
        this.texture = null;
        this.resolution = null;
        this.scene = new Scene();
        this.clock = new Clock({ autoStart: false });
        this.renderer = new WebGLRenderer({ antialias: true });
        this.camera = new PerspectiveCamera(45, 1 / 1, .1, 1000);

        this.dummy = new Object3D();
        this.sectionWidth = 200;
        this.loopSectionPosition = 0;

        this.uniforms = {
            u_time: {
                value: 0.0
            }
        }

        this.init();
    }

    init() {
        // const geometry = new PlaneBufferGeometry(100, 50, 100, 100);
        // const material = new ShaderMaterial({
        //     uniforms: this.uniforms,
        //     vertexShader: VertexSmoke,
        //     fragmentShader: FragmentSmoke,
        //     wireframe: true,
        //     fog: false
        // });

        // this.mesh = new Mesh(geometry, material);
        // this.scene.add(this.mesh);
        this.addInstancedMesh();

        this.onResize();
        window.addEventListener('resize', this.onResize);

        this.camera.position.y = 0;
        this.camera.position.z = 300;

        this.loop();
    }

    addInstancedMesh() {
        // An InstancedMesh of 4 cubes
        this.mesh = new InstancedMesh(new BoxBufferGeometry(50,50,50), new MeshNormalMaterial(), 4);
        console.log(this.mesh);
        this.scene.add(this.mesh);
        this.setInstancedMeshPositions(this.mesh, 0);
    }

    setInstancedMeshPositions(mesh, section) {
        for ( let i = 0; i < mesh.count; i ++ ) {
            // we add 200 units of distance (the width of the section) between each.
            const xStaticPosition = -this.sectionWidth * (i - 1);
            const xSectionPosition = this.sectionWidth * section;
            const x = xStaticPosition + xSectionPosition;
            this.dummy.position.set(x, 0, 0);
            this.dummy.updateMatrix();
            mesh.setMatrixAt( i, this.dummy.matrix );
        }
        mesh.instanceMatrix.needsUpdate = true;
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

    loopFunction() {
        const distance = Math.round(this.camera.position.x / this.sectionWidth);
        if (distance !== this.loopSectionPosition) {
            this.loopSectionPosition = distance;
            this.setInstancedMeshPositions(this.mesh, this.loopSectionPosition);
        }
    }

    draw = () => {
        const time = this.clock.getDelta();
        this.uniforms.u_time.value += time;
        this.camera.position.x += 5.;
        this.loopFunction();
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
