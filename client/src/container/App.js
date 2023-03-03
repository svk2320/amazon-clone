import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

const NotFound = () => (
  <div>
    <h1>Sorry, this page isn't available</h1>
  </div>
);

function App() {
  return (
    <div>
      <Routes>
        <Route path='/signin' element={<></>} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
