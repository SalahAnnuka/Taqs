import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import User from './components/User';
import City from './components/City';





function App() {

  function UserError(){
    return(
      <div>Please consider <Link to="/Login">Logging in</Link> to proceed.</div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/SignUp" element={<SignUp/>}/>
          <Route exact path="/User/:Username" element={<User/>}/>
          <Route exact path="/User" element={<UserError/>}/>
          <Route exact path="/User/:Username/:country/:city" element={<City/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
