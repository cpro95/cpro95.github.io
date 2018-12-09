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
        <div className="wraper d-flex flex-column justify-content-around align-items-center">
          <figure class="figure">
            <img
              src="/static/two-kids.png"
              class="figure-img img-fluid rounded"
              alt="my sons"
            />
            <figcaption class="figure-caption text-right">
              Lovely two kids in snowy days
            </figcaption>
          </figure>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Family;
