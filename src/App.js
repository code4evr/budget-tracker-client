import React, { useState } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import BudgetComponent from './Components/Expenses/BudgetComponent';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar';
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
import NewBudget from './Components/Modals/NewBudget';
import store from './Redux/store';
import NewExpense from './Components/Modals/NewExpense';
import Tab from './Components/Tabs/Tab';
import ConfirmModal from './Components/Modals/ConfirmModal';

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
                <Provider store={store}>
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
                          toggle ? 'sidebar hide' : 'sidebar'
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
                        <div className="container-fluid container-sm">
                          <Route path="/app/home">
                            <Tab />
                          </Route>
                          <Route path="/app/analytics">
                            <Analytics />
                          </Route>
                          <Route path="/app/budget/:id">
                            <div>
                              <BudgetComponent />
                            </div>
                          </Route>
                        </div>
                      </div>

                      <NewBudget />
                      <NewExpense />
                      <ConfirmModal />
                    </div>
                  </div>
                </Provider>
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
