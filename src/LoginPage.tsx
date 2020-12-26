import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BackendConnector from './BackendConnector';
import UserForm, {UserFormData} from './UserForm';
import {GlobalStateContext} from './App';
import {Col, Row, Typography} from 'antd';
const {Title} = Typography;

const LoginPage = () => {
  const history = useHistory();
  const [globalState, setGlobalState] = useContext(GlobalStateContext);
  const onLogin = (formData: UserFormData) => {
    BackendConnector.signup(formData).then(newUser => {
      setGlobalState(() => ({user: newUser}));
      history.push('/plan');
    });
  };

  return (
    <>
      <section>
        <Row>
          {/* @TODO: Reusable page title component */}
          <Col span={20} offset={4}>
            <Title className="" level={2}>Log In</Title>
          </Col>
        </Row>
      </section>
      <section>
        <UserForm onSubmit={onLogin} />
      </section>
    </>
  );
};

export default LoginPage;
