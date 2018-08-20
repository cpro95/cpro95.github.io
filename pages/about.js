import Header from '../components/Header';
import { BGChanger } from '../components/Utils';

class About extends React.Component {
    componentDidMount() {
        BGChanger('/static/background-image1.jpg');
    }

    render() {
        return (
            <div>
                <Header />
                <div className="wraper d-flex flex-column justify-content-center align-items-center">
                    <div className="jumbotron w-75 text-white">
                        <h1 className="display-4">Hello, there!</h1>
                        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                        <hr className="my-4" />
                            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                            <a className="btn btn-primary btn-lg" href="http://github.com/cpro95" role="button">Learn more</a>
                    </div>
                </div>
            </div>
                );
            }
        }
        
export default About;