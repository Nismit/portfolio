import { Scene, WebGLRenderer, PerspectiveCamera, Clock, PlaneBufferGeometry, ShaderMaterial, Mesh, InstancedMesh, Object3D, TextureLoader, LoadingManager } from 'three';
import Vertex from '../shaders/vertexScroller';
import Fragment from '../shaders/fragmentScroller';

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
        this.manager = new LoadingManager();

        this.dummy = new Object3D();
        this.sectionWidth = 10;
        this.loopSectionPosition = 0;

        this.textures = [];

        this.scrollValue = 0;

        this.uniforms = {
            u_time: {
                value: 0.0
            }
        }

        this.init();
    }

    init() {
        this.addInstancedMesh();
        this.loadTexture();

        this.onResize();
        window.addEventListener('resize', this.onResize);

        this.camera.position.y = 0;
        this.camera.position.z = 10;

        this.loop();
    }

    addInstancedMesh() {
        // An InstancedMesh of 4 cubes
        const options = {
            transparent: true,
            uniforms: this.uniforms,
            vertexShader: Vertex,
            fragmentShader: Fragment
        }

        this.mesh = new InstancedMesh(new PlaneBufferGeometry(6, 4), new ShaderMaterial( options ), 4);
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

    loadTexture() {
        const testData = {
            'random1': {
                url: 'https://picsum.photos/2048/1024'
            },
            'random12': {
                url: 'https://picsum.photos/2048/1024'
            },
            'random123': {
                url: 'https://picsum.photos/2048/1024'
            },
            'random1234': {
                url: 'https://picsum.photos/2048/1024'
            },
            'random12345': {
                url: 'https://picsum.photos/2048/1024'
            },
        }

        const loader = new TextureLoader( this.manager );

        for (var key in testData) {
            this.textures.push(new Promise((resolve, reject) => {
                const entry = testData[key];
                const url = entry.url;

                loader.load(url,
                    texture => {
                        entry.val = texture;
                        resolve(entry);
                    },
                    error => {
                        reject(new Error(error + 'An error occurred loading while loading: ' + entry.url));
                    }
                );
            }));
        }

        this.manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };

        Promise.all(this.textures).then(loadedTextures => {
            console.log(loadedTextures);
        });
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
        // this.camera.position.x += 5.;
        this.camera.position.x = this.scrollValue;
        this.loopFunction();
        this.renderer.render(this.scene, this.camera);
        this.frameId = window.requestAnimationFrame(this.draw);
    }

    update(value) {
        this.scrollValue = value;
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    destroy() {
        cancelAnimationFrame(this.frameId);
        window.removeEventListener('resize', this.onResize);
    }
}
