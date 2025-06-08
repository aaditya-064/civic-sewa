// import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Auth/SignUp";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Login from "./pages/Auth/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path={"/register"} Component={SignUp} />
          <Route path={"/login"} Component={Login} />
          <Route path={"/"} Component={HomePage} />
          <Route path={"/about"} Component={AboutPage} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
