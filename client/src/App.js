import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import User from './User';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/SignUp" element={<SignUp/>}/>
          <Route exact path="/User" element={<User/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
