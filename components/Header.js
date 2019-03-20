import Link from 'next/link';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>Works</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
    </div>
    <style jsx>{`
      .header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
      }

      .header__container {
        width: 100%;
        padding: 2rem;
      }
    `}</style>
  </header>
)

const linkStyle = {
  marginRight: 15
}

export default Header;