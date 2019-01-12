import React from "react";
import styles from "./Bio.module.css";
import bioPic from "./bio-pic.png";

function Bio(props) {
  return (
    <div
      className={`
      ${styles.Bio}
      ${props.className || ""}
    `}
    >
      <img src={bioPic} alt="blog img" />
      <p>
        Enjoy my blog, thanks to "npx create-react-blog" James K Nelson.
        <br />
        Based on{" "}
        <a href="https://facebook.github.io/create-react-app/">
          create-react-app
        </a>
        , <a href="https://mdxjs.com/">MDX</a>, and{" "}
        <a href="https://frontarm.com/navi/">Navi</a>.
      </p>
    </div>
  );
}

export default Bio;
