import { BrowserRouter, Route, Routes } from "react-router-dom";
import RestaurantLandingPage from "./pages/RestaurantLandingPage.js";
import GlobalStyles from "./styles/GlobalStyles";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Home } from "./pages/Book.js";

import { Book } from "./pages/Book.js";
import React from "react";
import { AppContextProvider } from "./context/Total.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyles />

        <Routes>
          <Route path="/" element={<RestaurantLandingPage />} />

          <Route
            path="/book/:matchId"
            element={
              <AppContextProvider>
                <Book />
              </AppContextProvider>
            }
          />

          {/* <Route path="/my-tickets/:encryptedId" element={<Tickets />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
