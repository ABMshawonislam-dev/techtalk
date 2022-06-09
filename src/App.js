import React from 'react'
import Registration from './pages/Registration';
import Login from './pages/Login';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Home from './pages/Home';
function App() {
  return (
   <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      


   </>
  );
}


export default App;
