import logo from "./logo.svg";
import "./App.css";
import SignIn from "./component/page/SignIn";
import SignUp from "./component/page/SignUp";
import app from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
