import React, { Component } from "react";
import Link from "next/link";

class Header extends Component {
  state = {
    isActive: false
  };

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  };

  render() {
    return (
      <nav className="navbar is-black">
        <div className="navbar-brand has-text-justified">
          <Link href="/">
            <a className="navbar-item has-text-weight-bold" href="#">
              cpro95.github.io
            </a>
          </Link>
          <a role="button" className="navbar-burger" onClick={this.toggleNav}>
            <span />
            <span />
            <span />
          </a>
        </div>

        <div
          className={
            this.state.isActive ? "navbar-menu is-active" : "navbar-menu"
          }
        >
          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item has-text-weight-bold" href="#">
                Home
              </a>
            </Link>
            <Link href="/works">
              <a className="navbar-item has-text-weight-bold" href="#">
                Works
              </a>
            </Link>
            <Link href="/family">
              <a className="navbar-item has-text-weight-bold" href="#">
                Family
              </a>
            </Link>
            <Link href="/about">
              <a className="navbar-item has-text-weight-bold" href="#">
                About
              </a>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
