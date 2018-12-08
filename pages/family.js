import Header from "../components/Header";
import Footer from "../components/Footer";
import { BGChanger } from "../components/Utils";

class Family extends React.Component {
  componentDidMount() {
    BGChanger("/static/background-image2.jpg");
  }

  render() {
    return (
      <div>
        <Header />
        <div className="wraper hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container">
              <h1 className="title has-text-white has-text-centered">
                두 아들
              </h1>
              <figure className="image is-16by9 has-text-centered">
                <img src="static/two-kids.png" alt="two-kids" />
              </figure>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Family;
