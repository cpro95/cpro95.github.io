import Header from "../components/Header";
import Footer from "../components/Footer";
import { BGChanger } from "../components/Utils";

class Works extends React.Component {
  componentDidMount() {
    BGChanger("/static/background-image3.jpg");
  }

  render() {
    return (
      <div>
        <Header />

        <div className="wraper d-flex flex-column justify-content-center align-items-center">
          <div className="row justify-content-around">
            <div
              className="col-sm-6 card border-dark mb-3 mx-3"
              style={{ maxWidth: "18rem" }}
            >
              <a className="card-link" href="https://cpro95.netlify.com">
                <div className="card-header">My Blog</div>
                <div className="card-body text-dark">
                  <h5 className="card-title">cpro95.netlify.com</h5>
                  <p className="card-text">
                    Powered by GatsbyJS which is a good static site generator,
                    <br />
                    Hosted in Netlify.com which has a fast connections.
                    <br />
                    <br />
                    <br />
                  </p>
                  <footer className="blockquote-footer">
                    Markdown page basis.
                  </footer>
                </div>
              </a>
            </div>

            <div
              className="col-sm-6 card border-dark mb-3 mx-3"
              style={{ maxWidth: "18rem" }}
            >
              <a className="card-link" href="https://movies-cpro95.netlify.com">
                <div className="card-header">My Movies</div>
                <div className="card-body text-dark">
                  <h5 className="card-title">movies-cpro95.netlify.com</h5>
                  <p className="card-text">
                    All the Movies in my HDD,
                    <br />
                    Backend by heroku server with SQL DB with KODI application.
                    <br />
                    Frontend by ReactJS with Material-UI design.
                  </p>
                  <footer className="blockquote-footer">
                    High defination, High ratings.
                  </footer>
                </div>
              </a>
            </div>

            <div
              className="col-sm-6 card border-dark mb-3 mx-3"
              style={{ maxWidth: "18rem" }}
            >
              <a className="card-link" href="https://kakao-cpro95.netlify.com">
                <div className="card-header">Kakao Service</div>
                <div className="card-body text-dark">
                  <h5 className="card-title">kakao-cpro95.netlify.com</h5>
                  <p className="card-text">
                    Kakao Services in my Web,
                    <br />
                    You can send KakaoTalk Messages in Your Web.
                    <br />
                    Kakao Developer API used.
                    <br />
                    <br />
                  </p>
                  <footer className="blockquote-footer">
                    Frontend for ReactJS with Bulma CSS framework.
                  </footer>
                </div>
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Works;
