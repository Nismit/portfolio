import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as THREE from 'three';
import Terrain from '../helpers/Terrain';
import Loading from '../components/Loading';
import { threeStart, threeLoaded } from '../helpers/store';

const mapStateToProps = state => ({
  localIsLoaded: state.isLoaded
});

const mapDispatchToProps = dispatch => ({
  initThreeByDispatch: () => {
    dispatch(threeStart())
  },
  loadedThreeByDispatch: () => {
    dispatch(threeLoaded())
  }
});

class MainVisual extends Component {
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
    this.props.initThreeByDispatch();
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const clock = new THREE.Clock({ autoStart: false });
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const camera = new THREE.PerspectiveCamera(60, width / height, .1, 10000);
    camera.position.y = 13;
    camera.position.z = 4;

    const obj = new Terrain();

    const isLoaded = obj.textureLoad();
    if (isLoaded !== null) {
      obj.init();
    }

    scene.add(obj.obj);
    renderer.setClearColor('#000000');
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.obj = obj;
    this.clock = clock;

    this.onUpdateScreen();
    window.addEventListener('resize', this.onUpdateScreen);

    this.mount.appendChild(this.renderer.domElement);

    this.props.loadedThreeByDispatch();
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
    this.obj.render(time);

    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.draw);
  }

  render() {
    return (
      <React.Fragment>
        <Loading isLoaded={this.props.localIsLoaded} />
        <div
          className="global-visual"
          style={{ width: '100vw', height: '100%', position: 'fixed', top: '0', left: '0', zIndex: '1' }}
          ref={(mount) => { this.mount = mount }}
        />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainVisual);