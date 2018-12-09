import Header from "../components/Header";
import Footer from "../components/Footer";
import { BGChanger } from "../components/Utils";

class About extends React.Component {
  componentDidMount() {
    BGChanger("/static/background-image1.jpg");
  }

  render() {
    return (
      <div>
        <Header />
        <div className="wraper d-flex flex-column justify-content-center align-items-center">
          <div className="jumbotron">
            <h1 className="display-4">Hello, there!</h1>
            <p className="lead">
              I'm a novice for web dev. I made this site in my spare time.
              <br />
              There's lots of stuff for learn for web dev, like css, animation,
              etc.
            </p>
            <hr className="my-4" />
            <p>
              This is a simple Bootstrap & NextJS app, if you want see the
              source code,
              <br />
              plese click the below button.
            </p>
            <a
              className="btn btn-primary btn-lg"
              href="http://github.com/cpro95"
              role="button"
            >
              Learn more
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
