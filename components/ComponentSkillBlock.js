
export default (props) => {
  const { title, skillGroup } = props.fields;

  if (!title) {
    return false;
  }

  return (
    <div className="content__skill-block">
      <div>
        <h2>{title}</h2>

        <ul>
          <li>Expert</li>
          <li>Intermediate</li>
          <li>Learning</li>
        </ul>
      </div>

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
          padding-left: 2.5rem;
          padding-right: 2.5rem;
        }

        h3 {
          margin-top: 1.8rem;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          display: inline-block;
        }

        .skills {
          display: flex;
          flex-wrap: wrap;
        }

        .skill {
          position: relative;
          display: inline-block;
          border: 3px solid #fff;
          color: #fff;
          text-align: center;
          text-decoration: none;
          outline: none;
          transition: all .2s;
          margin-right: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .skill[data-level="3"] {
          border-color: #0adebd;
        }

        .skill[data-level="2"] {
          border-color: #906dca;
        }

        .skill[data-level="1"] {

        }

        .skill::before,
        .skill::after {
          position: absolute;
          z-index: 2;
          content: '';
          width: 0;
          height: 0;
          border: 3px solid transparent;
          box-sizing: content-box;
        }
        .skill::before {
          top: -3px;
          left: -3px;
        }
        .skill::after {
          bottom: -3px;
          right: -3px;
        }
        .skill:hover {
          color: #fff;
        }
        .skill:hover::before,
        .skill:hover::after {
          width: 100%;
          height: 100%;
        }
        .skill:hover::before {
          border-bottom-color: #fff;
          border-left-color: #fff;
          transition: height .2s, width .2s .2s;
        }
        .skill:hover::after {
          border-top-color: #fff;
          border-right-color: #fff;
          transition: height .2s .4s, width .2s .6s;
        }
        .skill>span {
          position: relative;
          z-index: 3;
          display: inline-block;
          padding: .9em 2.6em;
          background-color: #000;
        }
      `}</style>
    </div>
  )
}
