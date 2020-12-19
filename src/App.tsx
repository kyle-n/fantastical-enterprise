import React, { useState, SetStateAction, Dispatch } from 'react';
import {PageHeader, Layout} from 'antd';
import 'antd/dist/antd.css'
import {User} from '../models/user';
import Header from './Header';

interface GlobalState {
  user: User | null;
}

const initialState: GlobalState = {
  user: null
};

const GlobalStateContext = React.createContext<[GlobalState, Dispatch<SetStateAction<GlobalState>>]>([initialState, () => {}]);

function App() {
  const [globalState, setGlobalState] = useState<GlobalState>(initialState);
  return (
    <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
      <main>
        <Layout>
          <Layout.Header style={{background: 'none'}}>
            <Header />
          </Layout.Header>
        </Layout>
        <PageHeader title="Fantastical Enterprise"
                    subTitle="The calendar and tasks app that helps your team work faster.">
        </PageHeader>
      </main>
    </GlobalStateContext.Provider>
  );
}

export default App;
