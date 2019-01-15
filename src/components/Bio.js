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
        Enjoy my blog!
        <br />
        Lots of stuff for Node, React, Flutter, Java, Git ...
        
      </p>
    </div>
  );
}

export default Bio;
