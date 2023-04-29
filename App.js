import './App.css';
import React, {useState} from 'react'
import About from './components/About';
import Navbar from './components/Navbar'
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState("light");
  const [alert,setAlert]  = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      mssg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  const toggleMode = ()=>{
    if(mode==="light"){
      setMode("dark");
      document.body.style.backgroundColor = "#050834";
      showAlert("Dark mode has been enabled", "success");
      document.title = "TextUtils-DarkMode";
    }
    if(mode==="dark"){
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Dark mode has been disabled", "success");
      document.title = "TextUtils-LightMode";
    }
  }
  return (
    <>
    <Router>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <div className='container my-3'> 
        {/* <TextForm heading='Enter the text to analyse' mode={mode} showAlert={showAlert}/> */}
        <Routes>
          {/* 'exact' use to do complete matching of path */}
          {/* if we don't use 'exact' then react does partial matching */}
          <Route exact path="/about" element={<About mode={mode}/>} />
          <Route path="/" element={<TextForm heading='Enter the text to analyse' mode={mode} showAlert={showAlert}/>} />
        </Routes>
      </div>

    </Router>
    </>
  );
}

export default App;
 
