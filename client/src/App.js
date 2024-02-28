import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import taqs_black from './drawable/taqs-black.svg';
import taqs_white from './drawable/taqs-white.svg';


function HomeNav(){
  return (
    <div className="NavBar">
      <img className="logo" src={taqs_white}/>
    </div>
  );
}

function Home(){
  return (
    <div className="Home">
      <HomeNav/>
      
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact/>
          <Route exact/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
