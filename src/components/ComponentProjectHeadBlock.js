import Link from 'next/link';
import styled from "@emotion/styled";

const ComponentProjectHeadBlock = (props) => {
    const url = props.title.replace(/\s/g, '-').toLowerCase();

    return (
        <_ProjectHeadBlock>
            <div>
                {props.title ? (
                    <h1>{props.title}</h1>
                ) : null}
                {props.subTitle ? (
                    <p>{props.subTitle}</p>
                ) : null}

                <Link as={`/project/${url}`} href={`/project?id=${props.projectId}`}>
                    <a className="project__link">View Project</a>
                </Link>

                <div className="project__nav__container">
                    <div className="project__nav prev" onClick={() => { props.navigatePrev(); }}>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12.707 18.293l-5.293-5.293h11.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-11.586l5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-7 7c-0.096 0.096-0.168 0.206-0.217 0.324-0.101 0.245-0.101 0.522 0 0.767 0.048 0.116 0.119 0.224 0.212 0.319 0.002 0.002 0.003 0.003 0.005 0.005l7 7c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
                        </svg>
                        <span>Prev</span>
                    </div>

                    <div className="project__nav next" onClick={() => { props.navigateNext(); }}>
                        <span>Next</span>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12.707 18.293l-5.293-5.293h11.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-11.586l5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-7 7c-0.096 0.096-0.168 0.206-0.217 0.324-0.101 0.245-0.101 0.522 0 0.767 0.048 0.116 0.119 0.224 0.212 0.319 0.002 0.002 0.003 0.003 0.005 0.005l7 7c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </_ProjectHeadBlock>
    )
}

const _ProjectHeadBlock = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    max-width: 1200px;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;

    .project__link {
        display: inline-block;
        margin-top: .7rem;
        color: white;
        border: 3px solid #fff;
        padding: .8rem 2.4rem;
        text-decoration: none;
        transition: all 500ms;
    }

    .project__link:hover {
        background-color: #2678bf;
        color: white;
        cursor: pointer;
    }

    .project__nav__container {
        display: flex;
        position: relative;
        top: 2rem;
    }

    .project__nav {
        cursor: pointer;
        padding: 1rem;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        transition: color 500ms;
    }

    .project__nav.prev {
        padding-left: 0;
    }

    .project__nav.next {
        padding-right: 0;
    }

    .project__nav svg {
        fill: #fff;
        margin-right: .7rem;
        transition: fill 500ms;
    }

    .project__nav.next svg {
        margin-right: 0;
        margin-left: .7rem;
        transform: rotate(180deg);
    }

    .project__nav:hover {
        color: #2678bf;
    }

    .project__nav:hover svg {
        fill: #2678bf;
    }

    @media (min-width: 45.176em) {
        max-width: 100%;
        padding-left: 5rem;
    }
`;

export default ComponentProjectHeadBlock;
