import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Connect from './components/Connect.js';
import Home from './components/Home.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Connect/>}/>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;

