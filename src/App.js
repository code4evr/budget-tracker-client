import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import BudgetComponent from './Components/Expenses/BudgetComponent';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar';
import Home from './Components/BudgetHome/Home';
import HomePage from './Components/Homepage/HomePage';
import Login from './Components/User/Login';
import Register from './Components/User/Registration';
import { AppProvider } from './Context/AppContext';
import { BudgetProvider } from './Context/BudgetContext';
import { AuthProvider } from './Context/AuthContext';
import AuthRoute from './utils/AuthRoute';
import SettingsPage from './Components/Settings/SettingsPage';
import Analytics from './Components/Analytics/Analytics';
import './main.css';

const App = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    console.log(toggle);
  };
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Switch>
          <Route path="/app">
            <AppProvider>
              <BudgetProvider>
                <div className="wrapper">
                  <div
                    className={
                      toggle
                        ? 'sidebar-overlay'
                        : 'sidebar-overlay show'
                    }
                  >
                    <div
                      className={
                        toggle ? 'sidebar-hide' : 'sidebar-show'
                      }
                    >
                      <Sidebar val={toggle} />
                    </div>
                  </div>
                  <div
                    className={
                      toggle
                        ? 'main-container main-container-grow'
                        : 'main-container'
                    }
                  >
                    <Navbar onclick={handleToggle} />
                    <div className="content">
                      <div className="container-fluid">
                        <Switch>
                          <Route path="/app/home">
                            <Home />
                          </Route>
                          <Route path="/app/analytics">
                            <Analytics />
                          </Route>
                          <Route path="/app/budget/:id">
                            <div>
                              <BudgetComponent />
                            </div>
                          </Route>
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
              </BudgetProvider>
            </AppProvider>
          </Route>
          <Route path="/prefs/settings">
            <SettingsPage />
          </Route>
        </Switch>
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/register" component={Register} />
      </Router>
    </AuthProvider>
  );
};

export default App;
