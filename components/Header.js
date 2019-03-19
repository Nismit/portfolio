import Link from 'next/link';

const Header = () => (
  <header>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>Works</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </header>
)

const linkStyle = {
  marginRight: 15
}

export default Header;