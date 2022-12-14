import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';

import SignIn from "./pages/user_management/SignIn";
import SignUp from "./pages/user_management/SignUp";
import RemoveUser from "./pages/user_management/RemoveUser";
import NotFound from "./pages/user_management/NotFound";

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

import { Provider } from 'react-redux'; // store를 자식 컴포넌트에게 사용하게 함
// import store from './redux/store'; // store에 세션과 로그인여부에 관한 정보가 있음
import store, {persistor} from './redux/index';
import { PersistGate } from 'redux-persist/integration/react';
// loading props는 리덕스와 스토리지가 동기화 될 동안 표시될 컴포넌트를 지정하는 것

function App() {
  const fontFamily = ['Roboto', 'Arial'].join(',');
  const theme = createTheme({
    typography: {
      fontFamily,
    },
  });
  return (
    // <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route index element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/removeUser"
                element={<PageLayout Article={RemoveUser} />}
              />
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
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
