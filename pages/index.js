import Header from "../components/Header";
import { BGChanger } from '../components/Utils';

const smoothScrolling = (event) => {
  event.preventDefault();
  var target = document.getElementById('start1');
  window.scrollTo({top: target.offsetTop, behavior:'smooth'});
};

class Index extends React.Component {
  componentDidMount() {
    BGChanger('/static/background-image4.jpg');
  }

  render() {
    return (
      <div>
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
        <div className="row justify-content-around">
          <div id="start1" className="col-sm-6 card border-dark mb-3 mx-3" style={{'maxWidth': '18rem'}}>
            <a className="card-link" href="https://cpro95.netlify.com">
              <div className="card-header">My Blog</div>
              <div className="card-body text-dark">
                <h5 className="card-title">cpro95.netlify.com</h5>
                <p className="card-text">
                  Powered by GatsbyJS which is a good static site generator,<br />
                  Hosted in Netlify.com which has a fast connections.<br />
                  <br />
                  <br />
                </p>
                <footer className="blockquote-footer">
                  Markdown page basis.
                </footer>
              </div>
            </a>
          </div>

          <div className="col-sm-6 card border-dark mb-3 mx-3" style={{'maxWidth': '18rem'}}>
            <a className="card-link" href="https://movies-cpro95.netlify.com">
              <div className="card-header">My Movies</div>
              <div className="card-body text-dark">
                <h5 className="card-title">movies-cpro95.netlify.com</h5>
                <p className="card-text">
                  All the Movies in my HDD,<br />
                  Backend by heroku server with SQL DB with KODI application.<br />
                  Frontend by ReactJS with Material-UI design.
              </p>
                <footer className="blockquote-footer">
                  High defination, High ratings.
              </footer>
              </div>
            </a>
          </div>


        </div>
      </div>


    );
  }
}

export default Index;
