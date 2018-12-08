import Header from "../components/Header";
import Footer from "../components/Footer";
import { BGChanger } from "../components/Utils";

const smoothScrolling = event => {
  event.preventDefault();
  var target = document.getElementById("start1");
  window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
};

class Index extends React.Component {
  componentDidMount() {
    BGChanger("/static/background-image4.jpg");
  }

  render() {
    return (
      <div>
        <Header />
        <section className="wraper hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container">
              <h1 className="title has-text-white has-text-centered">
                Welcome To My Home!
              </h1>
              <h2 className="subtitle has-text-white has-text-centered">
                All of my digital life!
              </h2>
              <div className="section has-text-centered">
                <button className="button is-primary" onClick={smoothScrolling}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div id="start1" className="tile is-ancestor">
            <div className="tile is-4 is-vertical is-parent">
              <div className="tile is-child">
                <p className="title">C/C++</p>
                <p className="subtitle is-6">
                  첫 프로그래밍은 중학교 2학년 때 Turbo C! ㅋㅋ, 아쉽게 이 책은
                  잃어 버렸음. 두꺼운 책으로 나름 방학때 정독했었는데 너무
                  어렵게 C를 배웠나? 지금은 C++ 제너릭에서 더이상 진도가
                  안나가고 있고! ㅠㅠ
                </p>
              </div>
              <div className="tile is-child">
                <p className="title">Qt</p>
                <p className="subtitle is-6">
                  대학교때 리눅스에 관심이 많아서 GUI를 만들려면 MFC보다 크로스
                  플랫폼 프레임웤인 Qt를 이용한 프로그래밍을 하고 싶었는데 Qt도
                  무지 어려웠음.
                </p>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                <p className="title">Javascript</p>
                <p className="subtitle is-6">
                  예전에 APM(아파치, PHP, MySql)으로 서버 좀 만지다가 한동안
                  웹쪽으로는 관심 끊었었는데 NodeJS가 나오고 나서 Javascript에
                  대해 완전히 새로 배웠음
                </p>
                <p className="subtitle is-6">
                  개인적으로 Javascript가 나한테 맞는 언어 같음. 이제는
                  홈페이지도 ReactJS 로 만들고 있고 백엔드쪽도 Node로 좀 놀고
                  있음
                </p>
                <p className="subtitle is-6">
                  NextJS로 Github 홈페이지도 만들고, 스태틱사이트에 블로그도
                  만들고 나름 많은 홈페이지를 만들었는데 최근에는 부트스트랩
                  말고 벌마(Bulma)를 사용한 CSS쪽에 도전하고 있음.
                </p>
                <p className="subtitle is-6">
                  최근에는 VueJS도 공부하고 싶은데 ReactJS도 잘 못하는데 뭘 더 공부할까
                  싶기도 해서, 더이상 안배우고 있다.
                  Electron도 어서 마무리 해야 되는데. 왜 이리 귀찮은지!!!!
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Index;
