import HeaderTitle from "../components/HeaderTitle";
import PageTitle from "../components/PageTitle";
import ConfigHeader from "../components/config/ConfigHeader";
import Config from "./config/Config";

function Home() {
  return (
    <div>
      <PageTitle title="홈" />
      <HeaderTitle title="홈" />
      <ConfigHeader />
      <Config />
    </div>
  );
}

export default Home;
