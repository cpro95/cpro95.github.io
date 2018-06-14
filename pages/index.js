import Layout from "../components/Layout";

const onClickHandler = () => {
  alert("kim");
};

export default () => (
    <Layout>
        <h1>Main Page</h1>
        <img className="img-fluid" src="/static/background-image3.jpg" alt="background-image"/>
        <button className="btn btn-primary" onClick={onClickHandler}>Hello</button>
    </Layout>
)