import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  flex: {
    display: "flex"
  },
  griditem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  media: {
    width: "100%",
    height: "85vh",
    backgroundImage: "url('/static/background-image2.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  title: {
    paddingTop: "15%",
    textAlign: "center",
    color: "white"
  }
};

class Index extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header />
        <Grid container className={classes.flex}>
          <Grid item xs={12} className={classes.griditem}>
            <div className={classes.media}>
              <div className={classes.title}>
                <Typography color="inherit" variant="display1" gutterBottom>
                  Welcome to My Home
                </Typography>
                <br />
                <Button variant="outlined" color="secondary" size="large">
                  <Link href="/works">
                    <a className={classes.link}>Learn More</a>
                  </Link>
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
