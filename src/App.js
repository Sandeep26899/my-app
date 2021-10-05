import './App.css';
import Navbar from './components/Navbar.js';
import TextForm from './components/TextForm.js';
import Alert from './components/Alert.js';
import React, {useState} from 'react';
import About from './components/About';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


function App() {
  
  const [mode, setMode] = useState('light');

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
  setAlert({
    msg: message,
    type: type
  })  
  setTimeout(()=> { 
    setAlert(null);
  }, 1500);  
  }

  const toggleMode = () => {
    if(mode === 'dark'){
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert('Light Mode Enabled', 'success');
    }
    else{
      setMode('dark');
      document.body.style.backgroundColor = '#042745';
      showAlert('Dark Mode Enabled', 'success');
    }
  }

    return (
      <Router>
        <Navbar title="TextUtils" name="Sandeep" mode={mode} toggleMode={toggleMode}/> 
        <Alert alert={alert}/>
        
        <Switch>

            <Route exact path="/">
            <TextForm title="Enter Text Below To Convert:" mode={mode} showAlert={showAlert}/>
            </Route>

            <Route exact path="/about">
              <About/>
            </Route>

        </Switch>
      </Router>
    );
}

export default App;