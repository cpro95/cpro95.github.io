import Layout from "../components/Layout";

const onClickHandler = () => {
  alert("kim");
};

class Index extends React.Component {
  render() {
    return (
      <Layout>
          <h1>
            Welcome to My Home
          </h1>
          <img
            style={{width:'100%'}}
            src="/static/background-image3.jpg"
            alt="background-image"
            />
          <button onClick={onClickHandler}>
            Hello
          </button>

      </Layout>
    );
  }
}

export default Index;
