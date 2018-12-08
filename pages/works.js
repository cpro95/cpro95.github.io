import Header from "../components/Header";
import Footer from "../components/Footer";
import { BGChanger } from "../components/Utils";

class Works extends React.Component {
  componentDidMount() {
    BGChanger("/static/background-image3.jpg");
  }

  render() {
    return (
      <div>
        <Header />
        <div className="wraper">
          <section className="section">
            <div className="tile is-ancestor">
              <div className="tile is-vertical">
                <div className="tile">
                  <div className="tile is-parent is-vertical">
                    <article className="tile is-child box">
                      <a href="https://cpro95.netlify.com">
                        <p className="title">cpro95.netlify.com</p>
                        <p className="subtitle">GatsbyJS를 이용한 블로그</p>
                      </a>
                    </article>
                    <article className="tile is-child box">
                      <a href="https://movies-cpro95.netlify.com">
                        <p className="title">movies-cpro95.netlify.com</p>
                        <p className="subtitle">
                          백엔드 Heroku 서버에서 json 데이타를 받아서 나름
                          깔끔하게 영화 정보를 보여주는 웹앱
                        </p>
                      </a>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <a href="https://kakao-cpro95.netlify.com">
                        <p className="title">kakao-cpro95.netlify.com</p>
                        <p className="subtitle">웹에서 카카오톡 보내기</p>
                        <figure className="image is-4by3">
                          <img src="static/kakao-logo.png" />
                        </figure>
                      </a>
                    </article>
                  </div>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <a href="http://github.com/cpro95">
                      <p className="title">github.com/cpro95</p>
                      <p className="subtitle">다른 앱 살펴보기</p>
                      <div className="subtitle is-6">
                        <p>
                          깃헙에는 초창기 C로 만든 것도 있고, Qt로 만든것도
                          있고, 파이썬, 노드JS 등 여러 언어로 다양한 것을 만들어
                          봤었다. 최근에는 거의 웹앱 쪽이거나 백엔드 서버쪽인
                          경우가 대부분이다. 얼마전부터 iOS 프로그래밍을
                          공부하고 있는데 생각보다 재밌다. 멋진 게임 하나
                          만들어서 대박내자. !!!
                        </p>
                      </div>
                    </a>
                  </article>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Works;
