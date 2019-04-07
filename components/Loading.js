
export default (props) => (
  <div className={`loading ${props.isLoaded && "is-loaded"}`}>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="83.061" height="27.143">
        <path fill="#FFF" d="M74.678 1.295v15.16L56.612 1.295H45.245l29.426 24.692.007-.008v.008h7.307V1.295zM55.215 25.987h11.367L37.172 1.309l-.012-.014-.002.002-.003-.002-.012.014-17.992 15.098L1.146 1.298v9.538l18.006 15.11.007-.008 17.998-15.103z" />
      </svg>
    </div>

    <style jsx>{`
      .loading {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: #000;
      }
      .loading.is-loaded {
        top: -100%;
      }
    `}</style>
  </div>
)