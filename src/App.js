import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route,Redirect } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { useContext } from "react";

import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import Layout from './components/Layout/Layout'
function App() {
  const authCtx = useContext(AuthContext);
 
  return (
    <BrowserRouter> 
      
      <div className="App">
        <Route path="/" exact>
        <Header />
          <Home />
        </Route>
        <Route path="/cart">
        <Header />
          <Cart />
        </Route>
      </div>
      {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
    </BrowserRouter>
    
  );
}

export default App;
