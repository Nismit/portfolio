import { useRef, useEffect } from 'react';
import NoiseBackground from '../helpers/NoiseBackground';

const MainBackground = () => {
    let visualManager;
    const refContainer = useRef(null);

    useEffect(() => {
        visualManager = new NoiseBackground();
        refContainer.current.appendChild(visualManager.renderer.domElement);

        return () => {
            if(refContainer.current.firstChild) {
                refContainer.current.removeChild(visualManager.renderer.domElement);
            }
            visualManager.destroy();
        }
    }, []);

    return (
        <div className="global-visual" ref={refContainer} />
    )
}

export default MainBackground;
