import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Table from './pages/Table';

function App() {
  return (
   
    <div className="App">
       
      <header className="App-header">
      <BrowserRouter>
                <Route path={'/'} exact component={Table}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/login'} component={Login}/>
      </BrowserRouter>
      </header>
     
    </div>
  );
}

export default App;
