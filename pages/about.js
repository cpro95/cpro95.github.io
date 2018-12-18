import Header from "../components/Header";
import Footer from "../components/Footer";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  flex: {
    paddingTop: "30px",
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  flexCenter: {
    justifyContent: "center"
  },
  link: {
    textDecoration: "none"
  },
  p1: {
    paddingLeft: "10px",
    paddingBottom: "30px"
  }
});

class About extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header />
            <Paper elevation={1}>
              <div className={classes.flex}>
                <Typography variant="h2" align='center' gutterBottom>
                  Hello, there!
                </Typography>
                <Typography variant="h6" align='center' className={classes.p1}>
                  I'm a novice for web dev. I made this site in my spare time.
                  <br />
                  There's lots of stuff for learn for web dev, like css,
                  animation, etc.
                </Typography>
                <Typography variant="h6" align='center' className={classes.p1}>
                  This is a simple Material-UI & NextJS app, if you want see the
                  source code,
                  <br />
                  plese click the below button.
                </Typography>
              </div>
              <div style={{ paddingLeft: "10px", textAlign: 'center' }}>
                <Button
                  className={classes.link}
                  variant="outlined"
                  color="secondary"
                  size="large"
                  component="a"
                  href="https://github.com/cpro95"
                >
                  Learn more
                </Button>
              </div>
              <br />
            </Paper>
        <Footer />
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
