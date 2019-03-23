
export default () => (
  <div>
    <div className="hero">
      <div className="hero__container">
        <h1>Interactive Developer</h1>
        <p>Vancouver based developer with 5+ years in web development industry</p>
      </div>
    </div>
    <style jsx>{`
        .hero {
          display: flex;
          align-items: center;
          height: 100vh;
        }

        .hero__container {
          width: 600px;
        }
      `}</style>
  </div>
)
