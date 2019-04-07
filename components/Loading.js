
export default (props) => (
  <div className={`loading ${props.isLoaded && "is-loaded"}`}>
    <div className="loading__transition__group">
      <div className="loading__transition"></div>
      <div className="loading__transition"></div>
      <div className="loading__transition"></div>
      <div className="loading__transition"></div>
      <div className="loading__transition"></div>
      <div className="loading__transition"></div>
      <div className="loading__transition"></div>
    </div>
    <div className="loading__transition__content">
      <svg xmlns="http://www.w3.org/2000/svg" width="83.061" height="27.143">
        <path fill="#FFF" d="M74.678 1.295v15.16L56.612 1.295H45.245l29.426 24.692.007-.008v.008h7.307V1.295zM55.215 25.987h11.367L37.172 1.309l-.012-.014-.002.002-.003-.002-.012.014-17.992 15.098L1.146 1.298v9.538l18.006 15.11.007-.008 17.998-15.103z" />
      </svg>
    </div>

    <style jsx>{`
      .loading {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        transition: top 0.15s ease-out 1750ms;
      }
      .loading.is-loaded {
        top: -100%;
      }
      .loading__transition__group {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
      }
      .loading__transition {
        display: flex;
        flex: 1;
        background-color: #000;
      }
      .loading__transition:nth-of-type(1) {
        transition: transform 0.6s ease-out 1100ms;
      }
      .loading__transition:nth-of-type(2) {
        transition: transform 0.6s ease-out 1000ms;
      }
      .loading__transition:nth-of-type(3) {
        transition: transform 0.6s ease-out 900ms;
      }
      .loading__transition:nth-of-type(4) {
        transition: transform 0.6s ease-out 800ms;
      }
      .loading__transition:nth-of-type(5) {
        transition: transform 0.6s ease-out 700ms;
      }
      .loading__transition:nth-of-type(6) {
        transition: transform 0.6s ease-out 600ms;
      }
      .loading__transition:nth-of-type(7) {
        transition: transform 0.6s ease-out 500ms;
      }
      .is-loaded .loading__transition {
        transform: translateY(-100%);
      }
      .loading__transition__content {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 102;
        opacity: 1;
        transition: opacity 400ms ease-out 0s, transform 100ms ease-out 450ms;
      }
      .is-loaded .loading__transition__content {
        opacity: 0;
        transform: translateY(-100%);
      }
    `}</style>
  </div>
)