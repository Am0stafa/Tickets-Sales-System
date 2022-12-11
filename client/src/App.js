import React from "react";
import BasicCard from "./components/Card";
import Navbar from "./components/Navbar";
import "./styles.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Search from "./components/Search";


export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Search/>
      <BasicCard/>

    </div>
  );
}
