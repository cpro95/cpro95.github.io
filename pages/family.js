import Header from '../components/Header';

class Family extends React.Component {
    componentDidMount() {
        const wraper = document.body.getElementsByClassName('wraper')[0].style;
        wraper.width="100%";
        wraper.height="93vh";
        wraper.backgroundImage="url('/static/background-image2.jpg')";
        wraper.backgroundRepeat="no-repeat";
        wraper.backgroundSize="cover";     
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