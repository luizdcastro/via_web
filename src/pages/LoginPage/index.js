import React, { useState } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../redux/actions/AuthActions';
import './styles.css'

const LoginPage = ({ dispatchLoginAction }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverError, setServerError] = useState('');

    const handleOnSubmmit = (event) => {
        event.preventDefault();
        dispatchLoginAction(
            email,
            password,
            () => console.log('Logged In!'),
            (response) => setServerError(response.error)
        );
    };

    return (
        <div>
            <form onSubmit={handleOnSubmmit}>
                <p>Email</p>
                <input
                    id="login-input"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                />
                <p>Senha</p>
                <input
                    id="login-input__password"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={password}
                    handleChange={(e) => setPassword(e.target.value)}
                />
                {serverError ? <p>{serverError}</p> : null}
                <button name="Entrar" onClick={handleOnSubmmit} />
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchLoginAction: (email, password, onSuccess, onError) =>
        dispatch(loginUser({ email, password }, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(LoginPage);