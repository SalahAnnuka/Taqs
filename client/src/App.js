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

function App() {
  return (
    <div className="App">
      <NavBar/>
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;
