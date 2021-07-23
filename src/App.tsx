import React from 'react';
import './App.css';
import { BrowserRouter, Route ,Switch } from 'react-router-dom';
import Mainscreen from './screens/Mainscreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Backoffice from './screens/Backoffice';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import { UserContext , TokenContext, FlashbagContext } from './context/contexts';
import User from './models/user';
import ProtectedRoute from './security/ProtectedRoute';
import Personal from './screens/Personal';
import Flashbag from './models/flashbag';

const App: React.FC = () => {

  const [ user, setUser] = React.useState(new User());

  const [ token, setToken] = React.useState("");
  
  const [ flashbag, setFlashbag] = React.useState(new Flashbag());

  return (
    <FlashbagContext.Provider value={{flashbag, setFlashbag}}>
    <TokenContext.Provider value={{token, setToken}}>
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>

        <Switch>

          <Route exact path="/" component={Login}/>

          <Route exact path="/register"component={Register}/>
          
          <Route exact path="/forgotPassword"component={ForgotPassword}/>

          <Route exact path="/resetPassword/:id"component={ResetPassword}/>

          <ProtectedRoute>

            <Route path="/mainscreen" component={Mainscreen}/>

            <Route path="/backoffice" component={Backoffice}/>

            <Route path="/personal" component={Personal}/>

          </ProtectedRoute>
          
        </Switch>

      </BrowserRouter>
    </UserContext.Provider>
    </TokenContext.Provider>
    </FlashbagContext.Provider>
  )
}

export default App;