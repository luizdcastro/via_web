import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Ellipsis } from 'react-css-spinners'

import { loginUser } from '../../redux/actions/AuthActions';
import FormInput from '../../components/FormInput';
import './styles.css'

const Login = ({ dispatchLoginAction }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false)


  const handleOnSubmmit = (event) => {
    event.preventDefault();
    setLoading(true)
    dispatchLoginAction(
      email,
      password,
      () => setLoading(false),
      (response) => { setServerError(response.error); setLoading(false) }
    );
  };

  return (
    <div className="login-container">
      <div className="login-banner">
      </div>
      <div className="login-content">
        <div className="login">
          <form onSubmit={handleOnSubmmit}>
            <h1 className="login-title">Acessar minha conta</h1>
            <p className="login-label">Email</p>
            <FormInput
              id="login-input"
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <p className="login-label">Senha</p>
            <FormInput
              id="login-input__password"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            {serverError ? <p className="login-error">{serverError}</p> : null}
            <button className="login-button" disabled={loading ? true : false} onClick={() => handleOnSubmmit}>
              {
                !loading ? 'Entrar' : <span> <Ellipsis color="#FFF" size={38} /></span>
              }
            </button>
          </form>
          <div className="login-separator">
          </div>
          <p className="login-disclamer">Neovia DB | BETA</p>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginAction: (email, password, onSuccess, onError) =>
    dispatch(loginUser({ email, password }, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(Login);