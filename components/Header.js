import Link from "next/link";

const Layout = () => (
<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
  <Link href="/">
    <a className="navbar-brand" href="#">cpro95.github.io</a>
  </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link href="/">
          <a className="nav-link" href="#">Home</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/works">
          <a className="nav-link" href="#">Works</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/family">
          <a className="nav-link" href="#">Family</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/about">
          <a className="nav-link" href="#">About</a>
        </Link>
      </li>
    </ul>

  </div>
</nav>
);

export default Layout;
