import { Scene, WebGL1Renderer, PerspectiveCamera, Clock, PlaneBufferGeometry, ShaderMaterial, MeshNormalMaterial, BufferAttribute, InstancedMesh, Object3D, TextureLoader, LoadingManager } from 'three';
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
        this.renderer = new WebGL1Renderer({ antialias: true });
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
            },
            u_texture: {
                value: null
            }
        }

        this.init();
    }

    init() {
        this.loadTexture();

        this.onResize();
        window.addEventListener('resize', this.onResize);

        this.camera.position.y = 0;
        this.camera.position.z = 8;

        this.loop();
    }

    addInstancedMesh() {
        // An InstancedMesh of 4 cubes
        const options = {
            transparent: true,
            uniforms: this.uniforms,
            vertexShader: Vertex,
            fragmentShader: Fragment,
            wireframe: false
        }

        const geometry = new PlaneBufferGeometry(8, 4);
        const arr = new Float32Array( [0, 1.0, 2.0, 3.0, 4.0] );
        geometry.setAttribute('texIndex', new BufferAttribute(arr, 1));

        this.mesh = new InstancedMesh(geometry, new ShaderMaterial(options), 4);
        this.scene.add(this.mesh);
        this.setInstancedMeshPositions(this.mesh, 0);
    }

    setInstancedMeshPositions(mesh, section) {
        for(let i = 0; i < mesh.count; i++) {
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

    async loadTexture() {
        const testData = {
            'random1': {
                url: '/three-palette-9.png'
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
                        resolve(texture);
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

        await Promise.all(this.textures).then(loadedTextures => {
            // loadedTextures.forEach((loadedTexture, idx) => {
            //     const u_tex
            //     this.uniforms
            // });

            console.log(loadedTextures);
            this.uniforms.u_texture.value = loadedTextures;
            console.log(this.uniforms.u_texture);

            // setTimeout(() => {
            //     this.uniforms.u_texture.value = loadedTextures[1];
            // }, 3000);
        });

        this.addInstancedMesh();
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
            // console.log(distance);
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
