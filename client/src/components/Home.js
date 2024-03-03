import HomeNav from "./NavBar/HomeNav";
import CityDetails from "./CityDetails";
import './Home.css';
  
  function Home(){
    return (
      <div className="Home">
        <HomeNav/>
        <div className="home-body">
          <CityDetails country="JO" city="Amman"/>
          <br/>
          <h1>Welcome To Taqs, Your Guide for International Weather</h1>
        </div>
      </div>
    );
  }

  export default Home;