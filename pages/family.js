import Header from "../components/Header";
import Footer from "../components/Footer";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  flex: {
    paddingTop: "30px",
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  card: {
    maxWidth: 650,
    height: 550,
  }
});

class Family extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className={classes.flex}>
          <Grid container>
            <Grid item xs={12} align="center">
              <Card>
                <CardMedia
                  className={classes.card}
                  image="/static/images/two-kids.png"
                  title="lovely two kids"
                />
                <CardContent>
                  <Typography variant="h6" align='center' gutterBottom>
                  lovely two kids with snowman
                  </Typography>
                  </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Family);
