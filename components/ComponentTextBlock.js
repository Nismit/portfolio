import { Component } from 'react';

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, content } = this.props;

    if (!title) {
      return null;
    }

    return (
      <div className="content__text-block">
        <h2>{title}</h2>

        {content ? (
          <p>{content}</p>
        ) : null}

        <style jsx>{`
        .content__text-block {
          padding-top: 4rem;
          padding-bottom: 4rem;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      `}</style>
      </div>
    )
  }
}
