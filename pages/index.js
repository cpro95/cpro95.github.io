import Header from "../components/Header";

const onClickHandler = () => {
  alert("Hello! There");
};

class Index extends React.Component {
  componentDidMount() {
    const wraper = document.body.getElementsByClassName('wraper')[0].style;
    wraper.width="100%";
    wraper.height="93vh";
    wraper.backgroundImage="url('/static/background-image4.jpg')";
    wraper.backgroundRepeat="no-repeat";
    wraper.backgroundSize="cover";
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
          <button className="h6 btn btn-primary" onClick={onClickHandler}>
            Get Started
          </button>
        </div>
        <div className="d-flex flex-column">
        
          <button className="btn btn-warning">TEST</button>
          1
          2
          <button className="btn btn-warning">TEST</button>
          3
          <button className="btn btn-warning">TEST</button>
          4
          <button className="btn btn-warning">TEST</button>
          5
          <button className="btn btn-warning">TEST</button>
          6
          <button className="btn btn-warning">TEST</button>
          7
          <button className="btn btn-warning">TEST</button>
          8
          <button className="btn btn-warning">TEST</button>
          9
          <button className="btn btn-warning">TEST</button>
          10
          <button className="btn btn-warning">TEST</button>

        </div>
      </div>


    );
  }
}

export default Index;
