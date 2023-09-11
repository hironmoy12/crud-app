import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AddUser from "./component/AddUser";
import DataTable from "./component/DataTable";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <h1>Crud App</h1>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/add-user" className="nav-link">
                    Add User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/data-table" className="nav-link">
                    Data Table
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
        <Route path="/" element={<AddUser />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/data-table" element={<DataTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
