import Link from 'next/link';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <div>
        <Link href="/">
          <a className="logo" style={linkStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="83.061" height="27.143">
              <path fill="#FFF" d="M74.678 1.295v15.16L56.612 1.295H45.245l29.426 24.692.007-.008v.008h7.307V1.295zM55.215 25.987h11.367L37.172 1.309l-.012-.014-.002.002-.003-.002-.012.014-17.992 15.098L1.146 1.298v9.538l18.006 15.11.007-.008 17.998-15.103z" />
            </svg>
          </a>
        </Link>
        <Link href="/about">
          <a className="menu__link" style={linkStyle}>Works</a>
        </Link>
        <Link href="/about">
          <a className="menu__link" style={linkStyle}>About</a>
        </Link>
      </div>
    </div>
    <style jsx>{`
      .header {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 15;
      }

      .header__container {
        width: 100%;
        padding: 2rem;
      }

      .menu__link {
        font-family: 'DIN condensed';
        text-transform: uppercase;
        color: white;
        letter-spacing: 2.5px;
        font-size: 1.5rem;
        text-decoration: none;
      }
    `}</style>
  </header>
)

const linkStyle = {
  marginRight: 15
}

export default Header;