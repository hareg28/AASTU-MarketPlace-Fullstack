import "../CSS/Home.css";

import Banner from "../Components/home/banner";
import Sidebar from "../Components/home/sidebar";
import ItemSales from "../Components/home/item";

const Home = () => {
  return (
    <div className="home">
      <div className="home-upper">
        <Sidebar />
        <Banner />
      </div>
      <div className="home-content">
        <ItemSales />
        <Banner />
        <ItemSales />
      </div>
    </div>
  );
};

export default Home;
