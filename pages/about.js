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
        <section className="wraper hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title has-text-white is-1">
                Hello, there!
              </h1>
              <p className="subtitle has-text-white">
                <div className="content">
                  <p>
                    I'm a novice for web dev. I made this site in my spare time.
                    <br />
                    There's lots of stuff for learn for web dev, like css,
                    animation, etc.
                  </p>
                  
                  <p>
                    This is a simple Bootstrap & NextJS app, if you want see the
                    source code,
                    <br />
                    plese click below button
                  </p>
                </div>
                <a className="button is-primary is-large" href="http://github.com/cpro95" role="button">Learn more</a>
              </p>
            </div>
          </div>
        </section>
          <Footer />
      </div>
    );
  }
}

export default About;
