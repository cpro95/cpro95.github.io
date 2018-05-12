import Link from "next/link";

const Layout = props => (
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link href="/">
        <a className="navbar-brand">cpro95.github.io</a>
      </Link>
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="navbar-collapse collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link href="/">
              <a className="nav-link">
                Home <span className="sr-only">(current)</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/works">
              <a className="nav-link">Works</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/family">
              <a className="nav-link">Family</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about">
              <a className="nav-link">About</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    {props.children}
  </div>
);

export default Layout;
