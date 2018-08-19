import Header from '../components/Header';

class Works extends React.Component {
    componentDidMount() {
        document.body.style.width = "100%";
        document.body.style.height = "100vh";
        document.body.style.backgroundImage = "url('/static/background-image1.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
    }

    render() {
        return (
            <div>
                <Header />
                <div className="wraper d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-white">Works page</h1>
                </div>
            </div>
        );
    }
}

export default Works;
