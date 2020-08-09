import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import projectData from '../data/projects';
import Footer from '../components/Footer';
import ComponentHead from '../components/ComponentHead';
import ComponentHeadBlock from '../components/ComponentHeadBlock';
import ComponentTextBlock from '../components/ComponentTextBlock';
import ComponentSkillBlock from '../components/ComponentSkillBlock';
import ComponentMediaBlock from '../components/ComponentMediaBlock';
import ComponentAlternativeBlock from '../components/ComponentAlternativeBlock';

function Project(props) {
    let visualContainer, scrollBar;
    const refContainer = useRef(null);
    const data = props.query ? projectData.allProjects[props.query.id].fields : null;

    useEffect(() => {
        const smoothScrollbar = require('smooth-scrollbar').default;
        scrollBar = smoothScrollbar.init(refContainer.current, {
            thumbMinSize: 10,
            alwaysShowTracks: true
        });

        scrollBar.addListener(() => onUpdateScroll());
        visualContainer = document.querySelector('.global-visual');
    }, []);

    useEffect(() => {
        gsap.to(refContainer.current, 0.8, { scrollTop: 0 });
    });

    const onUpdateScroll = () => {
        visualContainer.style.transform = `translate3d(0,-${scrollBar.offset.y}px, 0)`;
    }

    return (
        <>
            <ComponentHead headTitle={data && data.title} />
            <div ref={refContainer} className={`page project virtual-scroll`}>
                <div className="project__header">
                    <ComponentHeadBlock
                        title={data && data.title}
                        subTitle={data && data.subTitle}
                    />
                </div>

                <div className="content project__content">

                    {
                        data && data.contentsModule.map((item, i) => {
                            if (item.sys.contentType.sys.id === 'contentTextBlock') {
                                return <ComponentTextBlock
                                    key={i}
                                    fields={item.fields}
                                />
                            } else if (item.sys.contentType.sys.id === 'contentSkillsBlock') {
                                return <ComponentSkillBlock
                                    key={i}
                                    fields={item.fields}
                                />
                            } else if (item.sys.contentType.sys.id === 'contentAlternativeBlock') {
                                return <ComponentAlternativeBlock
                                    key={i}
                                    fields={item.fields}
                                />
                            } else if (item.sys.contentType.sys.id === 'contentImageBlock') {
                                return <ComponentMediaBlock
                                    key={i}
                                    fields={item.fields.images}
                                />
                            } else {
                                return false;
                            }
                        })
                    }

                </div>

                <Footer />
            </div>
        </>
    )
}

Project.getInitialProps = async ({ query }) => {
    return { query }
}

export default Project;
