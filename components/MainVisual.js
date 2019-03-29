import React, { Component } from 'react';
import * as THREE from 'three';
import Terrain from '../helpers/Terrain';

export default class MainVisual extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resolution: {
        width: 0,
        height: 0
      },
      isLoaded: false,
      progress: 0
    }

    this.loop = this.loop.bind(this);
    this.stop = this.stop.bind(this);
    this.draw = this.draw.bind(this);
    this.onUpdateScreen = this.onUpdateScreen.bind(this);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    //  1 of 10
    const scene = new THREE.Scene();
    const clock = new THREE.Clock({ autoStart: false });
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const camera = new THREE.PerspectiveCamera(60, width / height, .1, 10000);
    this.progressIndicator();

    // 2
    camera.position.y = 8;
    camera.position.z = 4;
    this.progressIndicator();

    // 3
    const obj = new Terrain();
    this.progressIndicator();
    // 5
    const isLoaded = obj.textureLoad();
    this.progressIndicator();
    if (isLoaded !== null) {
      obj.init();
    }
    this.progressIndicator();
    // console.log(obj);

    // 6
    this.progressIndicator();
    scene.add(obj.obj);
    renderer.setClearColor('#000000');
    renderer.setSize(width, height);

    this.progressIndicator();
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.obj = obj;
    this.clock = clock;

    // 8
    this.progressIndicator();
    this.onUpdateScreen();
    window.addEventListener('resize', this.onUpdateScreen);


    // 9
    this.progressIndicator();
    this.mount.appendChild(this.renderer.domElement);
    this.clock.start();
    this.loop();
    // 10
    this.progressIndicator();
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
    this.obj.render(time);

    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.draw);
  }

  progressIndicator() {
    this.setState((prevState) => ({ progress: prevState.progress + 1 }), () => { console.log(this.state.progress) });
  }

  render() {
    return (
      <div
        className="global-visual"
        style={{ width: '100vw', height: '100%', position: 'fixed', top: '0', left: '0', zIndex: '1' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
