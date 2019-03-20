import React, { Component } from 'react';
import * as THREE from 'three';

class Terrain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resolution: {
        width: 0,
        height: 0
      }
    }

    this.loop = this.loop.bind(this);
    this.stop = this.stop.bind(this);
    this.draw = this.draw.bind(this);
    this.onUpdateScreen = this.onUpdateScreen.bind(this);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const clock = new THREE.Clock({ autoStart: false });
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
    const cube = new THREE.Mesh(geometry, material);

    camera.position.z = 4;
    scene.add(cube);
    renderer.setClearColor('#000000');
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;
    this.clock = clock;

    this.onUpdateScreen();
    window.addEventListener('resize', this.onUpdateScreen);

    this.mount.appendChild(this.renderer.domElement);
    this.clock.start();
    this.loop();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
    window.removeEventListener('resize', this.onUpdateScreen);
  }

  onUpdateScreen() {
    this.setState(prevState => ({
      resolution: {
        ...prevState.resolution,
        width: document.documentElement.clientWidth,
        height: window.innerHeight
      }
    }), () => {
      const { width, height } = this.state.resolution;

      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }

  stop() {
    this.clock.stop();
    cancelAnimationFrame(this.frameId);
  }

  loop() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.draw);
    }
  }

  draw() {
    const time = this.clock.getDelta();
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.draw);
  }

  render() {
    return (
      <div
        style={{ width: '100vw', height: '100%', position: 'fixed', top: '0', left: '0', zIndex: '5' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Terrain