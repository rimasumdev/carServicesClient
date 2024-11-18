import Carousel from "./Banner/Carousel";
import About from "./About/About";
import Services from "./Services/Services";
const Home = () => {
  return (
    <div className="mt-10">
      <Carousel />
      <About />
      <Services />
    </div>
  );
};

export default Home;
