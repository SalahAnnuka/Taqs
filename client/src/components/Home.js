import Facts from "./Facts";
import HomeNav from "./NavBar/HomeNav";
import CityDetails from "./CityDetails";
import "./styles/Home.css";

  function Home(){
    return (
      <div className="Home">
        <HomeNav/>
        <div className="home-body">
          <CityDetails country="JO" city="Amman"/>
          <br/>
          <h1 className="home-title">Taqs, Your Guide for International Weather</h1>
          <br/>
          <article className="home-article">
          Welcome to Taqs! Your go-to homepage for instant access to real-time weather updates and forecasts.<br/><br/> Developed by SalahAldeen and Ibraheem, Taqs streamlines your weather checking routine, bringing you the latest forecasts with just a click (or two (or three...)). Say goodbye to guessing and hello to informed planning - Taqs has got you covered.
           </article>
           <Facts/>
        </div>
      </div>
    );
  }

  export default Home;