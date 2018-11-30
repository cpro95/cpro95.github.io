import Header from "../components/Header";
import { BGChanger } from "../components/Utils";

const smoothScrolling = event => {
  event.preventDefault();
  var target = document.getElementById("start1");
  window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
};

class Index extends React.Component {
  componentDidMount() {
    BGChanger("/static/background-image4.jpg");
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Header />
        <div className="wraper d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-4 text-white font-weight-bold mb-4">
            Welcome to My Home
          </h1>
          <p className="h5 text-white mb-3">
            My whole life of digital, and so on.
          </p>
          <button className="h6 btn btn-primary" onClick={smoothScrolling}>
            Get Started
          </button>
        </div>
        <hr />
        <div className="d-flex flex-row justify-content-center">
          <div
            id="start1"
            className="col-sm-6 card border-dark mb-3 mx-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Web Development</div>
            <div className="card-body text-dark">
              <h5 className="card-title">NodeJS, Go, Dart</h5>
              <p className="card-text">
                ReactJS, Redux, NextJS, GatsbyJS
                <br />
                ExpressJS, Go powered backend RESTful apps
                <br />
              </p>
              <footer className="blockquote-footer">
                Mordern Web Technology
              </footer>
            </div>
          </div>

          <div
            className="col-sm-6 card border-dark mb-3 mx-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header">Mobile Development</div>
            <div className="card-body text-dark">
              <h5 className="card-title">IOS, Android</h5>
              <p className="card-text">
                Swift, Java
                <br />
                ReactNative, Flutter
                <br />
                <br />
                <br />
              </p>
              <footer className="blockquote-footer">
                Speed, Resuable Code creation
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
