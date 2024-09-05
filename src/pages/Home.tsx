import { Header } from "../components";
import CardContainer from "../containers/CardContainer";

function Home() {
  return (
    <>
      <Header />
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <CardContainer />
      </div>
    </>
  );
}

export default Home;
