import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom';
import BackendConnector from './BackendConnector';
import {GlobalStateContext} from './App';
import UserForm, {UserFormData} from './UserForm';
import {Col, Row, Typography} from 'antd';
const {Title, Paragraph} = Typography;

const SignupPage = () => {
  const history = useHistory();
  const [globalState, setGlobalState] = useContext(GlobalStateContext);
  const onSignup = (formData: UserFormData) => {
    BackendConnector.signup(formData).then(newUser => {
      // @TODO: Generate JWTs with desired expiration, store them in localStorage
      setGlobalState(() => ({...globalState, user: newUser}));
      history.push('/plan');
    });
  };

  return (
    <>
      <section>
        <Row>
          <Col xs={{span: 24, offset: 0}} md={{span: 20, offset: 4}}>
            <Title className="" level={2}>Sign Up</Title>
            <Paragraph>
              Passwords must have at least 8 characters and 1 number.
            </Paragraph>
          </Col>
        </Row>
      </section>
      <section>
        <UserForm onSubmit={onSignup} />
      </section>
    </>
  );
};

export default SignupPage;
