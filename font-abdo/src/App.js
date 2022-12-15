import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import { Book } from "./components/Book";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:matchId" element={<Book />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
