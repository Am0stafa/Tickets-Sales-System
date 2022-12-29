import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { css } from "styled-components/macro"; //eslint-disable-line
import Home from "./pages/Home.js";
import { Book } from "./pages/Book.js";
import React from "react";
import { AppContextProvider } from "./context/Total.js";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./ScrollToTop";
import Test from './Test';
import BallLoading from "./components/ballLoading/BallLoading";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyles />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/book/:matchId"
              element={
                <AppContextProvider>
                  <Book />
                </AppContextProvider>
              }
            />

            <Route path="/checkout/:id" element={<Checkout />} />

            <Route path="/test" element={<Test/>} />

            {/* <Route path="/my-tickets/:encryptedId" element={<Tickets />} /> */}
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
