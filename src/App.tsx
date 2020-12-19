import React, { useState, SetStateAction, Dispatch } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Layout} from 'antd';
import 'antd/dist/antd.css'
import {User} from '../models/user';
import Header from './Header';
import HomePage from './Home';

interface GlobalState {
  user: User | null;
}

const initialState: GlobalState = {
  user: null
};

const GlobalStateContext = React.createContext<[GlobalState, Dispatch<SetStateAction<GlobalState>>]>([initialState, () => {}]);

const routes = [
  {
    path: '',
    layout: <HomePage />,
  },
  {
    path: 'signup',
    layout: <div></div>
  },
  {
    path: 'login',
    layout: <div></div>
  },
  {
    path: 'plan',
    layout: <div></div>
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
                return (<Route key={route.path} path={'/' + route.path}>{route.layout}</Route>);
              })}
            </Switch>
          </Layout.Content>
        </Layout>
      </main>
      </BrowserRouter>
    </GlobalStateContext.Provider>
  );
}

export default App;
