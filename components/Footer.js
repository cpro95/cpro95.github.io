import React from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  flex: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent : 'center',
  },
  paper: {
    textAlign: "center"
  }
};

const Footer = props => {
  const { classes } = props;

  return (
    <footer className={classes.flex}>
      <Divider />
      <Paper elevation={0} className={classes.paper}>
        <p>
          Built on <strong>React / NextJS</strong> with{" "}
          <strong>Material-UI</strong> by Me!{" "}
          <a href="https://github.com/cpro95">cpro95</a>
          <br />
          MIT license
        </p>
      </Paper>
    </footer>
  );
};

export default withStyles(styles)(Footer);
