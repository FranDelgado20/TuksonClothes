import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesViews from "./routes/RoutesViews";
import NavComp from "./components/NavComp";
import FooterComp from "./components/FooterComp";
import './css/App.css'
const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <NavComp />
          <main className="main-content">
            <RoutesViews />
          </main>
          <FooterComp />
        </div>
      </Router>
    </>
  );
};

export default App;
