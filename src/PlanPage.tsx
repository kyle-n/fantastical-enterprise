import React, { useContext } from 'react';
import {GlobalStateContext} from './App';

const PlanPage = () => {
  const [globalState, setGlobalState] = useContext(GlobalStateContext);

  return (
    <div>Plan for {globalState.user?.email ?? 'none'}</div>
  );
};

export default PlanPage;
