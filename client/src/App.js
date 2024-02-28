import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import taqs_black from './drawable/taqs-black.svg';
import taqs_white from './drawable/taqs-white.svg';


function HomeNav(){
  return (
    <div className="HomeNav">
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
          <Route exact path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
