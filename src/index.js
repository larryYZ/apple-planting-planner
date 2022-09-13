import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import AppleTreeVariety from "./components/AppleTreeVariety";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <main style={{ padding: "1rem" }}>
              <p>Select an apple tree variety</p>
            </main>
          }
        />
        <Route path=":appleTreeVariety" element={<AppleTreeVariety />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
