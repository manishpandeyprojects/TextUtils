import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Alert from './components/Alert';
import React, {useState} from 'react';

function App() {

  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  let showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);

  }
  
  let toggleMode = ()=>{
    if(mode === 'light'){
      setMode("dark");
      document.body.style.backgroundColor = "#2b2c41";
      showAlert('Enabled dark mode', 'success');
      document.title = "Textutils - dark mode";
    }else{
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert('Enabled light mode', 'success');
      document.title = "Textutils - light mode";
    }
  }

  return (
    <>
      <Navbar navbarTitle="TextUtils" aboutText="About Us" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <Textform title="Enter your text here" showAlert={showAlert} mode={mode} />
    </>
  );
}

export default App;
