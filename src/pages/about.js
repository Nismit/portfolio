import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import data from '../data/about';
import Footer from '../components/Footer';
import ComponentHead from '../components/ComponentHead';
import ComponentHeadBlock from '../components/ComponentHeadBlock';
import ComponentTextBlock from '../components/ComponentTextBlock';
import ComponentSkillBlock from '../components/ComponentSkillBlock';
import ComponentAlternativeBlock from '../components/ComponentAlternativeBlock';

function AboutPage() {
    let visualContainer, scrollBar;
    const refContainer = useRef(null);

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
            <ComponentHead headTitle="About" />
            <div ref={refContainer} className={`page about virtual-scroll`}>
                <div className="about__header">
                    <ComponentHeadBlock
                        title={data.title}
                        subTitle={data.subTitle}
                    />
                </div>

                <div className="content about__content">

                    {
                        data.contentsModule.map((item, i) => {
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
export default AboutPage;
