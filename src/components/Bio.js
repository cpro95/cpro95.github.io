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
        코딩 관련 블로입니다.
        <br />
        주로 배우고 있는 거는 NodeJS, React, Flutter, Java, Git ...
        
      </p>
    </div>
  );
}

export default Bio;
