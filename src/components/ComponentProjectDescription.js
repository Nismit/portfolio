import styled from "@emotion/styled";

const ComponentProjectDescription = ({ props }) => {
    const { client, techStack, role, description } = props;

    return (
        <_ProjectDescription>
            <div className="left">
                { client &&
                    <div>
                        <p className="title">Client</p>
                        <p className="subtitle">{ client }</p>
                    </div>
                }

                { techStack &&
                    <div>
                        <p className="title">Tech Stack</p>
                        <p className="subtitle">{ techStack }</p>
                    </div>
                }

                { role &&
                    <div>
                        <p className="title">Role</p>
                        <p className="subtitle">{ role }</p>
                    </div>
                }
            </div>
            <div className="right">
                { description && description.content.map((content, i) => {
                    if (content.nodeType === 'paragraph') {
                        return <p key={i}>{content.content[0].value}</p>
                    }
                })}
            </div>
        </_ProjectDescription>
    )
}

const _ProjectDescription = styled.div`
    width: 100%;
    max-width: 1200px;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;

    .title {
        color: white;
        margin-bottom: 0.2rem;
        text-transform: uppercase;
        font-weight: 600;
    }

    .left {
        min-width: 200px;
    }

    .right {
        padding-left: 3rem;
    }

    @media (max-width: 45.176em) {
        display: block;

        .left {
            min-width: 100%;
        }

        .right {
            margin-top: 3rem;
            padding-left: 0;
        }
    }
`;

export default ComponentProjectDescription;
