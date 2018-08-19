import Header from "../components/Header";

const onClickHandler = () => {
  alert("Hello! There");
};

class Index extends React.Component {
  componentDidMount() {
    document.body.style.width = "100%";
    document.body.style.height = "100vh";
    document.body.style.backgroundImage = "url('/static/background-image4.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }
  render() {
    return (
      <div>
        <Header />
        <div className="wraper d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-3 text-white">
            Welcome to My Home
        </h1>
          <p className="display-5 text-white">
            my whole life of digital, and so on.
        </p>
          <button className="display-6 btn btn-primary" onClick={onClickHandler}>
            Get Started
          </button>
        </div>
      </div>


    );
  }
}

export default Index;
