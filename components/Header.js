import React from "react";
import Link from "next/link";

class Header extends React.Component {
  state = {
    isActive: false
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  }

  render() {
    return(
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link href="/">
        <a className="navbar-brand font-weight-bold" href="#">
          cpro95.github.io
        </a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={this.toggleNav}
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className={this.state.isActive ? "in navbar-collapse" : "collapse navbar-collapse"}>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link font-weight-bold" href="#">
                Home
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/works">
              <a className="nav-link font-weight-bold" href="#">
                Works
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/family">
              <a className="nav-link font-weight-bold" href="#">
                Family
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about">
              <a className="nav-link font-weight-bold" href="#">
                About
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    );
  }
}
export default Header;
