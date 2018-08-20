import Header from '../components/Header';
import { BGChanger } from '../components/Utils';

class Works extends React.Component {
    componentDidMount() {
        BGChanger('/static/background-image3.jpg');
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
