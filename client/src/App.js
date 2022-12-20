import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import "./App.css";
import { Book } from "./pages/Book.js";
import React from "react";
import { AppContextProvider } from './context/Total.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
            <Route path="/book/:matchId" element={
            <AppContextProvider>
                <Book />
            </AppContextProvider>
            } />
          
          {/* <Route path="/my-tickets/:encryptedId" element={<Tickets />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
