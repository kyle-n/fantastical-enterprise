import React, { useState, SetStateAction, Dispatch } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Layout} from 'antd';
import 'antd/dist/antd.css'
import {User} from './models/user';
import Header from './Header';
import HomePage from './Home';
import PlanPage from './PlanPage';
import SignupPage from './Signup';
import LoginPage from './LoginPage';
import Footer from './Footer';

interface GlobalState {
  user: User | null;
}

const initialState: GlobalState = {
  user: null
};

export const GlobalStateContext = React.createContext<[GlobalState, Dispatch<SetStateAction<GlobalState>>]>([initialState, () => {}]);

const routes = [
  {
    path: '',
    layout: <HomePage />,
  },
  {
    path: 'signup',
    layout: <SignupPage />
  },
  {
    path: 'login',
    layout: <LoginPage />
  },
  {
    path: 'plan',
    layout: <PlanPage />
  }
];

function App() {
  const [globalState, setGlobalState] = useState<GlobalState>(initialState);
  return (
    <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
      <BrowserRouter>
      <main>
        <Layout>
          <Layout.Header style={{background: 'none'}}>
            <Header />
          </Layout.Header>
          <Layout.Content>
            <Switch>
              {routes.map(route => {
                return (<Route key={route.path} exact path={'/' + route.path}>{route.layout}</Route>);
              })}
            </Switch>
          </Layout.Content>
          <Layout.Footer>
            <Footer />
          </Layout.Footer>
        </Layout>
      </main>
      </BrowserRouter>
    </GlobalStateContext.Provider>
  );
}

export default App;
