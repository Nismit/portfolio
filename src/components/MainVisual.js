import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as THREE from 'three';
import Terrain from '../helpers/Terrain';
import Loading from '../components/Loading';
import { actionTypes } from '../helpers/store';

const MainVisual = () => {
  let scene, camera, renderer, obj, clock, frameId;
  const refContainer = useRef(null);
  const dispatch = useDispatch();
  const _isLoaded = useSelector(state => state.isLoaded);
  const [resolution, setResolution] = useState({width: 0, height: 0});

  useEffect(() => {
    dispatch({ type: actionTypes.THREE_LOADED.PENDING });
    const width = refContainer.current.clientWidth;
    const height = refContainer.current.clientHeight;

    scene = new THREE.Scene();
    clock = new THREE.Clock({ autoStart: false });
    renderer = new THREE.WebGLRenderer({ antialias: true });
    camera = new THREE.PerspectiveCamera(60, width / height, .1, 10000);
    camera.position.y = 13;
    camera.position.z = 4;

    obj = new Terrain();

    const isLoaded = obj.textureLoad();
    if (isLoaded !== null) {
      obj.init();
    }

    scene.add(obj.obj);
    renderer.setClearColor('#000000');
    renderer.setSize(width, height);

    onUpdateScreen();
    window.addEventListener('resize', onUpdateScreen);

    refContainer.current.appendChild(renderer.domElement);

    dispatch({ type: actionTypes.THREE_LOADED.SUCCESS });
    clock.start();
    loop();

    return () => {
      stop();
      refContainer.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', onUpdateScreen);
    }
  }, []);

  const onUpdateScreen = () => {
    const newResolution = {
      width: document.documentElement.clientWidth,
      height: window.innerHeight
    }

    setResolution({...newResolution});
    const { width, height } = newResolution;

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const stop = () => {
    clock.stop();
    cancelAnimationFrame(frameId);
  }

  const loop = () => {
    if (!frameId) {
      frameId = requestAnimationFrame(draw);
    }
  }

  const draw = () => {
    const time = clock.getDelta();
    obj.render(time);

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(draw);
  }

  return (
    <>
      <Loading isLoaded={_isLoaded} />
      <div
        className="global-visual"
        style={{ width: '100vw', height: '100%', position: 'fixed', top: '0', left: '0', zIndex: '1' }}
        ref={refContainer}
      />
    </>
  )
}

export default MainVisual;
