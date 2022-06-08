import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage"
import Portfolio  from './components/Portfolio/Portfolio';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route exact path="/" element={ <Homepage/> }> </Route>
        <Route exact path="/Portfolio" element={ <Portfolio/> }></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
