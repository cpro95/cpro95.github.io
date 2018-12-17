import Header from "../components/Header";
import Footer from "../components/Footer";
// import Link from "next/link";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Divider from "@material-ui/core/Divider";

const smoothScrolling = event => {
  event.preventDefault();
  var target = document.getElementById("start1");
  window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
};

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 600,
    height: 650
  },
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
    backgroundImage: "url('/static/images/background-image2.jpg')",
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
  },
  title2: {
    textAlign: "center",
    paddingBottom: '20px',
  }
});

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
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={smoothScrolling}
                >
                  {/* <Link href="/works"> */}
                  {/* <a className={classes.link} onClick={smoothScrolling}> */}
                  Learn More
                  {/* </a> */}
                  {/* </Link> */}
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />

        <div className={classes.title2} id="start1">
          <Typography color="inherit" variant="display1" gutterBottom>
            My Projects
          </Typography>
        </div>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={2} spacing={10}>
            <GridListTile component="a" href="https://cpro95.netlify.com">
              <img src="/static/images/gatsby_blog.png" alt="kakao service" />
              <GridListTileBar
                title="Gatsby Blog"
                // subtitle={<span>by: me</span>}
                // titlePosition="top"
              />
            </GridListTile>
            <GridListTile
              component="a"
              href="https://movies-cpro95.netlify.com"
            >
              <img src="/static/images/movies.png" alt="kakao service" />
              <GridListTileBar
                title="Movies DB"
                // subtitle={<span>by: me</span>}
                // titlePosition="top"
              />
            </GridListTile>
            <GridListTile component="a" href="https://kakao-cpro95.netlify.com">
              <img src="/static/images/kakao.png" alt="kakao service" />
              <GridListTileBar
                title="KakaoTalk in my webpage"
                // subtitle={<span>by: me</span>}
                // titlePosition="top"
              />
            </GridListTile>
          </GridList>
        </div>

        <Footer />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
