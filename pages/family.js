import Header from '../components/Header';

class Family extends React.Component {
    componentDidMount() {
        document.body.style.width = "100%";
        document.body.style.height = "100vh";
        document.body.style.backgroundImage = "url('/static/background-image2.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";        
    }

    render() {
        return (
            <div>
                <Header />
                <div className="wraper d-flex flex-column justify-content-center align-items-center">
                    <h1 className="text-white">Family page</h1>
                </div>
            </div>
        );
    }

}

export default Family;