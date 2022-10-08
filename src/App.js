import logo from "./logo.svg";
import "./App.css";
import SignIn from "./component/page/SignIn";
import SignUp from "./component/page/SignUp";

import Agree from "./component/page/Agree";
import PrivacyPolicy from "./component/page/PrivacyPolicy";
import app from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async"; // meta태그 사용 패키지


function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <>
          {/*<Helmet>
            <meta name="google-signin-client_id" content="1037417891725-d7fnfaa8up490p8ghd6cl6tmc9nbbi4v.apps.googleusercontent.com" />
          </Helmet> */}

          <Routes>
            <Route index element={<SignIn />} />
            <Route path="Signup" element={<SignUp />} />
            <Route path="Agree" element={<Agree />} />
            <Route path="Test" element={<Agree />} />
            <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
          </Routes>
        </>
      </HelmetProvider>
    </BrowserRouter>
  );
}
// https://thebook.io/080203/ch27/03-01/ meta 태그 사용 참고
export default App;
