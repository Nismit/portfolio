import { useRef, useEffect, useState } from 'react';
import styled from "@emotion/styled";
import data from '../data/projects';
import Scroller from '../helpers/Scroller';
import ComponentHead from '../components/ComponentHead';
import ComponentProjectHeadBlock from '../components/ComponentProjectHeadBlock';

function Projects() {
    let projectsManager, percentage = 0;
    const _delta = { value: 0 };
    const coefficient = 120;
    const refContainer = useRef(null);
    const refScrollContainer = useRef(null);
    const [projectNumber, setProjectNumber] = useState(0);

    const lerp = (a, b, t) => {
        return ((1 - t) * a + t * b);
    }

    const onWheel = (e) => {
        if(!e) { e = window.event }

        // console.log(e);
        // Chrome/Safari has wheelDelta on wheel event
        // Firefox does not implement wheelDelta, so deltaY can be used the value
        const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.deltaY)));
        // var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        // console.log('Delta:', delta);
        // const otherDelta = e.wheelDeltaY || e.deltaY * -1;
        // console.log('Other:', otherDelta);
        // const wheelDeltaY = e.wheelDeltaY / 120 * -1;
        // console.log('WheelDeltaY:', wheelDeltaY);
        // const deltaY = e.deltaY * -1;
        // console.log('DeltaY:', deltaY);

        if((_delta.value + (delta * coefficient) > 0)) {
            _delta.value = 0;
        } else {
            _delta.value += (delta * coefficient);
        }

        percentage = lerp(percentage, -_delta.value, .02);
        console.log(percentage);
        projectsManager.update(Math.round(percentage * 100) / 100);
    }

    useEffect(() => {
        // async function getLocomotive() {
        //     const Locomotive = (await import('locomotive-scroll')).default;
        //     new Locomotive({
        //         el: refScrollContainer.current,
        //         smooth: true
        //     });
        // }

        // getLocomotive();
        // refScrollContainer.current.addEventListener('scroll', e => onScroll(e) );
        projectsManager = new Scroller();
        refContainer.current.appendChild(projectsManager.renderer.domElement);
        refScrollContainer.current.addEventListener("wheel", onWheel);

        return () => {
            if(refContainer.current.firstChild) {
                refContainer.current.removeChild(projectsManager.renderer.domElement);
            }
            refScrollContainer.current.removeEventListener("wheel", onWheel);
            // refScrollContainer.current.removeEventListener("DOMMouseScroll", onWheel);
            // refScrollContainer.current.addEventListener("mousewheel", onWheel);
            // refScrollContainer.current.addEventListener("DOMMouseScroll", onWheel);
            projectsManager.destroy();
        }
    }, []);

    const navToNextProject = () => {
        const limit = data.allProjects.length - 1;
        const newProjectNumber = projectNumber + 1;

        if (newProjectNumber > limit) {
            setProjectNumber(0);
        } else {
            setProjectNumber(newProjectNumber);
        }
    }

    const navToPrevProject = () => {
        const limit = data.allProjects.length - 1;
        const newProjectNumber = projectNumber - 1;

        if (newProjectNumber < 0) {
            setProjectNumber(limit);
        } else {
            setProjectNumber(newProjectNumber);
        }
    }

    return (
        <>
            <ComponentHead headTitle="Project" />

            <main>
                <_Projects ref={refContainer} />
                <_Scroll ref={refScrollContainer} />

                {/* <div className="project__header">
                    <ComponentProjectHeadBlock
                        projectId={projectNumber}
                        title={data.allProjects[projectNumber].fields.title}
                        subTitle={data.allProjects[projectNumber].fields.subTitle}
                        navigateNext={() => { navToNextProject() }}
                        navigatePrev={() => { navToPrevProject() }}
                    />
                </div> */}
            </main>
        </>
    )
}

const _Projects = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`;

const _Scroll = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
`;

export default Projects;
