import styled from "@emotion/styled";

const ComponentSkillBlock = (props) => {
    const { title, skillGroup } = props.fields;

    if (!title) {
        return false;
    }

    return (
        <_SkillBlock>
            <div className="skill-block__header">
                <h2>{title}</h2>
            </div>

            {
                skillGroup.map((item) => (
                    <div className="skill-block" key={item.sys.id}>
                        <h3>{item.fields.title}</h3>

                        <div className="skills">
                            {
                                item.fields.skills.map((skill) =>
                                    <div className="skill" key={skill.sys.id} data-level={skill.fields.level}>
                                        <span>{skill.fields.title}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </_SkillBlock>
    )
}

const _SkillBlock = styled.div`
    padding-top: 4rem;
    padding-bottom: 4rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    @media (min-width: 45.176em) {
        padding-left: 2.5rem;
        padding-right: 2.5rem;
    }

    .skill-block__header {
        display: flex;
        justify-content: space-between;
    }

    h3 {
        margin-bottom: 1.5rem;
    }

    .content__skill-block > .skill-block {
        margin-bottom: 1.7rem;
    }

    .skills {
        display: flex;
        flex-wrap: wrap;
    }

    .skill {
        position: relative;
        display: inline-block;
        color: #fff;
        text-align: center;
        text-decoration: none;
        outline: none;
        margin-right: 1.5rem;
        margin-bottom: 1.5rem;
    }
`;

export default ComponentSkillBlock;
