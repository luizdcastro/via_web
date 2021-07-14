import React, { useEffect, useState, useMemo } from 'react'
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Ellipsis from '@bit/joshk.react-spinners-css.ellipsis';

import { logoutUser } from "../../redux/actions/AuthActions";
import { getMe, updateUser } from '../../redux/actions/UserActions'

import "./styles.css"

const AccountPage = ({ getme, disptachGetMe, dispatchUpdateUser, dispatchLogout }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)

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

    const handleUpdateUser = () => {
        setLoading1(true)
        dispatchUpdateUser(
            name,
            email,
            getme._id,
            () => {
                disptachGetMe();
                setLoading1(false);
            },
            (error) => {
                console.log(error);
                setLoading1(false)
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
                    <TextField
                        label="Nome"
                        size="small"
                        variant="outlined"
                        style={{ width: 325, marginTop: 15 }}
                        InputLabelProps={{ style: { fontSize: 13, } }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        size="small"
                        disabled
                        variant="outlined"
                        style={{ width: 325, marginTop: 15 }}
                        InputLabelProps={{ style: { fontSize: 13, } }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button id="account-create-button" disabled={loading1 ? true : false} onClick={() => handleUpdateUser()}>
                        {
                            !loading1 ? 'Atualizar Perfil' : <span><Ellipsis color="#FFF" size={32} /></span>
                        }
                    </button>
                    <p className="account-password-label">Alterar senha</p>
                    <TextField
                        label="Nova senha "
                        disabled
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
                        disabled
                        security
                        variant="outlined"
                        style={{ width: 325, marginTop: 15 }}
                        InputLabelProps={{ style: { fontSize: 13, } }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button id="account-create-button" disabled={loading ? true : false} onClick={() => { }}>
                        {
                            !loading ? 'Atualizar Senha' : <span><Ellipsis color="#FFF" size={42} /></span>
                        }
                    </button>
                    <div className="acccount-separator"></div>
                    <button id="account-create-button-light" disabled={loading ? true : false} onClick={() => handleLogOut()}>
                        {
                            !loading ? 'Sair' : <span><Ellipsis color="#FFF" size={33} /></span>
                        }
                    </button>

                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchLogout: () => dispatch(logoutUser()),
    disptachGetMe: () => dispatch(getMe()),
    dispatchUpdateUser: (name, email, userId, onSuccess, onError) =>
        dispatch(updateUser({ name, email }, userId, onSuccess, onError)),
});


const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);