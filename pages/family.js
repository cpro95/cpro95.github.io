import Header from '../components/Header';
import { BGChanger } from '../components/Utils';

class Family extends React.Component {
    componentDidMount() {
        BGChanger('/static/background-image2.jpg');
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