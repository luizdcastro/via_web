import React, { useEffect, useState, useMemo } from 'react'
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { Ellipsis } from 'react-css-spinners'

import { logoutUser, updatePassword } from "../../redux/actions/AuthActions";
import { getMe } from '../../redux/actions/UserActions'

import "./styles.css"

const AccountPage = ({ getme, disptachGetMe, dispatchUpdatePassword, dispatchLogout }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [passwordCurrent, setPasswordCurrent] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, SetPasswordConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const [sucessMessage, setSucessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [errorDetails, setErrorDetails] = useState("")

    useEffect(() => disptachGetMe(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    const editableData = getme

    useMemo(() => {
        if (!!editableData) {
            setName(editableData?.name);
            setEmail(editableData?.email)
        }
    }, [editableData]);

    const handleUpdatePassword = () => {
        setLoading(true)
        setErrorMessage(false)
        setSucessMessage(false)
        dispatchUpdatePassword(
            passwordCurrent,
            password,
            passwordConfirm,
            () => {
                setLoading(false);
                setSucessMessage(true);
                setPassword("");
                setPasswordCurrent("");
                SetPasswordConfirm("");
            },
            (error) => {
                setLoading(false);
                setErrorMessage(true);
                setErrorDetails(error.error);
            }
        )
    }

    const handleLogOut = () => {
        dispatchLogout()
    }

    return (
        <div className="account-page">
            <div>
                <h2 className="account-title">Configurações</h2>
                <p className="account-data-label">Informações do usuário</p>
                <div className="account-input-data">
                    <div className="acccount-data-name">
                        <p className="account-data-content">{name}</p>
                    </div>
                    <div className="acccount-data-name">
                        <p className="account-data-content">{email}</p>
                    </div>
                    <p className="account-password-label">Alterar senha</p>
                    <TextField
                        label="Senha Atual"
                        size="small"
                        type="password"
                        variant="outlined"
                        style={{ width: 325, marginTop: 15 }}
                        InputLabelProps={{ style: { fontSize: 13, } }}
                        value={passwordCurrent}
                        onChange={(e) => setPasswordCurrent(e.target.value)}
                    />
                    <TextField
                        label="Nova senha "
                        size="small"
                        type="password"
                        variant="outlined"
                        style={{ width: 325, marginTop: 15 }}
                        InputLabelProps={{ style: { fontSize: 13, } }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirmar senha"
                        size="small"
                        type="password"
                        variant="outlined"
                        style={{ width: 325, marginTop: 15 }}
                        InputLabelProps={{ style: { fontSize: 13, } }}
                        value={passwordConfirm}
                        onChange={(e) => SetPasswordConfirm(e.target.value)}
                    />
                    {
                        !!passwordConfirm & !!password & !!passwordCurrent ?
                            <button id="account-password-button" disabled={loading ? true : false} onClick={() => handleUpdatePassword()}>
                                {
                                    !loading ? 'Atualizar Senha' : <span> <Ellipsis color="#FFF" size={42} /></span>
                                }
                            </button>
                            :
                            <button id="account-password-button-disabled" disabled>Atualizar Senha</button>
                    }

                    {sucessMessage && (<p className="password-sucess-message">Senha atualizada com sucesso</p>)}
                    {errorMessage && (<p className="password-error-message">{errorDetails}</p>)}
                    <div className="acccount-separator"></div>
                    <button id="account-create-button-light" disabled={loading ? true : false} onClick={() => handleLogOut()}>Sair </button>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchLogout: () => dispatch(logoutUser()),
    disptachGetMe: () => dispatch(getMe()),
    dispatchUpdatePassword: (passwordCurrent, password, passwordConfirm, userId, onSuccess, onError) =>
        dispatch(updatePassword({ passwordCurrent, password, passwordConfirm }, userId, onSuccess, onError)),
});


const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);