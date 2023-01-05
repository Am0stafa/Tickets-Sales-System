import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { css } from "styled-components/macro"; //eslint-disable-line
import Home from "./pages/Home.js";
import { Book } from "./pages/Book.js";
import React from "react";
import { AppContextProvider } from "./context/Total.js";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./ScrollToTop";
import BallLoading from "./components/ballLoading/BallLoading";
import PaymentSuccess from "./components/paymentSF/PaymentSuccess";
import PaymentFail from "./components/paymentSF/PaymentFail";
import MyTickets from "./components/myTickets/MyTickets";
import About from "./pages/About";
import Contact from "./pages/Contact";

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

            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/fail" element={<PaymentFail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/my-tickets" element={<MyTickets />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
