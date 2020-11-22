import React from "react";
import Header from "./components/Header";
import Routes from "./Routes";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes />
      </div>
     
    </>
  );
};

export default App;
