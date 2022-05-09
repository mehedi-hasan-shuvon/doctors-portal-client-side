
import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
function App() {
  return (
    <div>
      {/* <button class="btn btn-primary">Button</button> */}
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='about' element={<About></About>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
