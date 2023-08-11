import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./shared/Layout";
import NoPage from "./pages/NoPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UrlTablePage from "./pages/UrlTablePage";
import AuthProvider from "./contexts/authProvider";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
      <AuthProvider>
      <BrowserRouter>
          <Routes>
              <Route index element={<HomePage />} />
              <Route path="/" element={<Layout/> }>
                  <Route path="table" element={<UrlTablePage />} />
                  <Route path="table/:page" element={<UrlTablePage />} />
                  <Route path="login" element={<LoginPage/>}/>
                  <Route path="signup" element={<SignUpPage/>}/>
                  <Route path="about" element={<AboutPage/>}/>
                  <Route path="/:link" element={<NoPage />} />
                  <Route path="*" element={<NoPage />} />
              </Route>

          </Routes>
      </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
