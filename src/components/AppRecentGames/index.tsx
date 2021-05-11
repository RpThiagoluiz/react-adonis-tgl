import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Container } from "./styles";

export const AppRecentGames = () => (
  <Container>
    <div className="bet">
      <section>
        <h2>RECENT GAMES</h2>
        <span>Filters</span>
        <div className="bet-container-filters">
          <button>Lotofacil</button>
          <button>Mega-sena</button>
          <button>Lotomania</button>
        </div>
      </section>

      <div className="bet-item-description">
        <p>
          1,2,3,1,5,48,4,1251,51,0,4,1251,51,0,4,1251,51,0,2,3,1,5,48,4,1251,51,0,4,1251,51,0
          ,2,3,1,5,48,4,1251,51,0,4,1251,51,0
        </p>
        <div>
          <p>30/11/2020 - (R$ 2,50)</p>
        </div>
        <strong>NomeDoGame</strong>
      </div>

      <div className="bet-item-description">
        <p>
          1,2,3,1,5,48,4,1251,51,0,4,1251,51,0,4,1251,51,0,2,3,1,5,48,4,1251,51,0,4,1251,51,0
          ,2,3,1,5,48,4,1251,51,0,4,1251,51,0
        </p>
        <div>
          <p>30/11/2020 - (R$ 2,50)</p>
        </div>
        <strong>NomeDoGame</strong>
      </div>

      <div className="bet-item-description">
        <p>
          1,2,3,1,5,48,4,1251,51,0,4,1251,51,0,4,1251,51,0,2,3,1,5,48,4,1251,51,0,4,1251,51,0
          ,2,3,1,5,48,4,1251,51,0,4,1251,51,0
        </p>
        <div>
          <p>30/11/2020 - (R$ 2,50)</p>
        </div>
        <strong>NomeDoGame</strong>
      </div>
    </div>

    <div className="new-bet">
      <Link to="/"> New Bet</Link> <HiOutlineArrowRight />
    </div>
  </Container>
);
