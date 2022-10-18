import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
import Agree from "./pages/login/Agree";
import PrivacyPolicy from "./pages/login/PrivacyPolicy";

import ImageUploadPage from "./pages/image/ImageUploadPage";
import ImageUploadResultPage from "./pages/image/ImageUploadResultPage";
import PageLayout from "./pages/page_layout/PageLayout";
import ImageListPage from "./pages/image/ImageListPage";
import ResultListPage from "./pages/result/ResultListPage";
import ResultDetailPage from "./pages/result/ResultDetailPage";
import ImageDetailPage from "./pages/image/ImageDetailPage";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import app from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import { HelmetProvider, Helmet } from "react-helmet-async"; // meta태그 사용 패키지



function App() {
  const fontFamily = ['Roboto', 'Arial'].join(',');
  const theme = createTheme({
    typography: {
      fontFamily,
    },
  });
  return (

    <BrowserRouter>
      <ThemeProvider theme={theme}>
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
              <Route
                path="/upload"
                element={<PageLayout Article={ImageUploadPage} />}
              />
              <Route
                path="/test"
                element={<PageLayout Article={ImageUploadResultPage} />}
              />
              <Route
                path="/images"
                element={<PageLayout Article={ImageListPage} />}
              />
              <Route
                path="/images/:imageId"
                element={<PageLayout Article={ImageDetailPage} />}
              />
              <Route
                path="/results"
                element={<PageLayout Article={ResultListPage} />}
              />
              <Route
                path="/results/:resultId"
                element={<PageLayout Article={ResultDetailPage} />}
              />
            </Routes>
          </>
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter >
  );
}
// https://thebook.io/080203/ch27/03-01/ meta 태그 사용 참고
export default App;
