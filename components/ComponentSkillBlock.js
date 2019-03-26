
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
            {
              item.fields.skills.map((skill) =>
                <div key={skill.sys.id} data-level={skill.fields.level}>
                  <p>{skill.fields.title}</p>
                </div>
              )
            }
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
      `}</style>
    </div>
  )
}
