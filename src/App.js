import React from "react";
import { Container  } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import notFound from "./NotFound";
// import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Home from "./Home";
import Signout from "./Signout";
function App() {
  return (
      <>
      <Header />
      <Container className="" style={{ minHeight: "80vh" }}>
        <BrowserRouter>
        <Routes>
          <Route exact path="/signin" Component={Login} />
          <Route exact path="/" Component={Home} />
          <Route exact path="/signout" Component={Signout} />
        </Routes>
        </BrowserRouter>
      </Container>
      <Footer />
      </>
  );
}

export default App;
