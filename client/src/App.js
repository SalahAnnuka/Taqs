import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import taqs_black from './drawable/taqs-black.svg';
import taqs_white from './drawable/taqs-white.svg';


function NavBar(){
  return (
    <div className="NavBar">
      <img className="logo" src={taqs_white}/>
    </div>
  );
}

function Home(){
  return (
    <div className="Home">
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Home/>
    </div>
  );
}

export default App;
