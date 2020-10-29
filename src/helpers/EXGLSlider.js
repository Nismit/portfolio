import {
    Scene,
    WebGL1Renderer,
    PerspectiveCamera,
    Clock,
    PlaneBufferGeometry,
    ShaderMaterial,
    Mesh,
    Object3D,
    TextureLoader,
    LoadingManager,
    Vector2
} from 'three';
import Vertex from '../shaders/vertexEXGLSlider';
import Fragment from '../shaders/fragmentEXGLSlider';

export default class GLSlider {
    constructor() {
        this.meshes = [];
        this.frameId = null;
        this.texture = null;
        this.resolution = new Vector2();
        this.scene = new Scene();
        this.clock = new Clock({ autoStart: false });
        this.renderer = new WebGL1Renderer({ antialias: true });
        this.camera = new PerspectiveCamera(45, 1 / 1, .1, 1000);
        this.manager = new LoadingManager();

        this.dummy = new Object3D();
        this.sectionWidth = 5;
        this.loopSectionPosition = 0;

        this.textures = [];

        this.scrollValue = 0;

        this.init();
    }

    init() {
        this.loadTexture();
    }

    onResize = () => {
        const width = document.documentElement.clientWidth;
        const height = window.innerHeight;

        this.resolution = new Vector2(width, height);

        this.renderer.setSize(width, height, true);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x121212, 1);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.meshes.forEach((mesh) => {
            // mesh.scale.set(0.5, 0.5, 1.0);
            mesh.updateMatrix();
        });

        // this.updateMesh();
    }

    async loadTexture() {
        const testData = {
            'random1': {
                url: 'https://picsum.photos/seed/015/2048/1024'
            },
            'random12': {
                url: 'https://picsum.photos/seed/114/2048/1024'
            },
            'random123': {
                url: 'https://picsum.photos/seed/123/2048/1024'
            },
            'random1234': {
                url: 'https://picsum.photos/seed/456/2048/1024'
            },
            'random12345': {
                url: 'https://picsum.photos/seed/789/2048/1024'
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
            loadedTextures.forEach((texture, index) => {
                console.log(index);

                const options = {
                    uniforms: {
                        u_texture: {
                            value: texture
                        },
                        u_imageResolution: {
                            value: new Vector2(2048, 1152)
                        },
                        u_windowResolution: {
                            value: this.resolution
                        },
                        u_meshPosition: {
                            value: new Vector2()
                        },
                        u_meshScale: {
                            value: new Vector2()
                        }
                    },
                    transparent: true,
                    vertexShader: Vertex,
                    fragmentShader: Fragment,
                    wireframe: false
                }

                const mesh = new Mesh(new PlaneBufferGeometry(2, 2), new ShaderMaterial(options));
                // console.log(mesh);

                const xStaticPosition = this.sectionWidth * (index - 1);
                const xSectionPosition = this.sectionWidth;
                const x = xStaticPosition + xSectionPosition;
                mesh.position.set(x, 0, 0);
                mesh.updateMatrix();

                this.meshes.push(mesh);
                this.scene.add(mesh);
            });
        });

        this.onResize();
        window.addEventListener('resize', this.onResize);

        this.camera.position.z = 5;

        this.loop();
    }

    getViewSize() {
        const fovInRadians = (this.camera.fov * Math.PI) / 180;
        const height = Math.abs(
          this.camera.position.z * Math.tan(fovInRadians / 2) * 2
        );

        return { width: height * this.camera.aspect, height };
    }

    updateMesh() {
        const viewSize = this.getViewSize();
        const items = Array.from(document.getElementsByClassName('slider__item'));

        items.forEach((item, index) => {
            // console.log('index', index);
            const rect = item.getBoundingClientRect();
            // console.log('Left:', rect.left);
            // console.log('Top:', rect.top);

            // 1. Transform pixel units to camera's view units
            const widthViewUnit = (rect.width * viewSize.width) / window.innerWidth;
            const heightViewUnit = (rect.height * viewSize.height) / window.innerHeight;
            let xViewUnit = (rect.left * viewSize.width) / window.innerWidth;
            let yViewUnit = (rect.top * viewSize.height) / window.innerHeight;

            // 2. Make units relative to center instead of the top left.
            xViewUnit = xViewUnit - viewSize.width / 2;
            yViewUnit = yViewUnit - viewSize.height / 2;

            // 3. Make the origin of the plane's position to be the center instead of top Left.
            let x = xViewUnit + widthViewUnit / 2;
            let y = -yViewUnit - heightViewUnit / 2;

            // this.meshes[index].material.uniforms.u_meshPosition.value.x = x / widthViewUnit;
            // this.meshes[index].material.uniforms.u_meshPosition.value.y = y / heightViewUnit;
            // this.meshes[index].material.uniforms.u_meshScale.value.x = widthViewUnit;
            // this.meshes[index].material.uniforms.u_meshScale.value.y = heightViewUnit;
        });

    }

    loop() {
        if (!this.frameId) {
            this.clock.start();
            this.frameId = requestAnimationFrame(this.draw);
        }
    }

    draw = () => {
        const time = this.clock.getDelta();
        this.camera.position.x = this.scrollValue;
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
