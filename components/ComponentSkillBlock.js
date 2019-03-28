
export default (props) => {
  const { title, skillGroup } = props.fields;

  if (!title) {
    return false;
  }

  return (
    <div className="content__skill-block">
      <h2>{title}</h2>

      {
        skillGroup.map((item) => (
          <div key={item.sys.id}>
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

      <style jsx>{`
        .content__skill-block {
          padding-top: 4rem;
          padding-bottom: 4rem;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        h3 {
          margin-top: 1.5rem;
        }

        .skills {
          display: flex;
          flex-wrap: wrap;
        }

        .skill {
          padding: 3px;
          margin-right: 1rem;
          margin-bottom: 1rem;
        }

        .skill > span {
          display: inline-block;
          padding: 1rem 1.5rem;
          background-color: #000;
        }

        .skill[data-level="3"] {
          background: linear-gradient(270deg, #26ecee, #0283cc);
          background-size: 200% 200%;

          -webkit-animation: AnimationName 5s ease infinite;
          -moz-animation: AnimationName 5s ease infinite;
          animation: AnimationName 5s ease infinite;
        }

        .skill[data-level="2"] {
          background: linear-gradient(270deg, #6c9fe6, #906dca);
          background-size: 200% 200%;

          -webkit-animation: AnimationName 5s ease infinite;
          -moz-animation: AnimationName 5s ease infinite;
          animation: AnimationName 5s ease infinite;
        }

        .skill[data-level="1"] {
          background: linear-gradient(270deg, #d03332, #ca8f6d);
          background-size: 200% 200%;

          -webkit-animation: AnimationName 5s ease infinite;
          -moz-animation: AnimationName 5s ease infinite;
          animation: AnimationName 5s ease infinite;
        }

        @-webkit-keyframes AnimationName {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        @-moz-keyframes AnimationName {
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
        @keyframes AnimationName { 
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
      `}</style>
    </div>
  )
}
