import logo from "./logo.svg";
import "./App.css";
import SignIn from "./component/page/SignIn";
import SignUp from "./component/page/SignUp";

import Agree from "./component/page/Agree"
import app from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="Signup" element={<SignUp />} />
        <Route path="Agree" element={<Agree />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
