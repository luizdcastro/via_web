import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { List } from "react-virtualized";
import * as FiIcons from 'react-icons/fi'

import { getAllDers, updateDer } from '../../redux/actions/DerActions'

import "./styles.css"

const DerPage = ({ dispatchUpdateDer, dispatchGetAllDers, der }) => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [editRow, setEditRow] = useState([])
    const [arteris, setArteris] = useState([])
    const [viaPaulista, setViaPaulista] = useState([])
    const [optionsUF, setOptionsUF] = useState("")
    const [updateValues, setUpdateValues] = useState({})

    useEffect(() => {
        dispatchGetAllDers();
        setData(der)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        updatePayload();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arteris, viaPaulista, setUpdateValues])
   
    useEffect(() => {
        if (der.length >= 1) {
            setData(
                der.filter((der) =>
                    (der.state?.toLowerCase().includes(optionsUF)) &&
                    (der.name?.toLowerCase().includes(search.toLocaleLowerCase()) ||
                        der.code?.toLowerCase().includes(search.toLocaleLowerCase())
                    )
                )
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, optionsUF, der]);

    const updateRef = (id, item) => {
        setData(
            data.map((data) => {
                return id === data.id
                    ? { ...data, ...item }
                    : data;
            })
        );
    };

    const updatePayload = () => {
        let payload

        if (!!arteris.id && !!viaPaulista.id) {
            payload = {
                id: arteris.id,
                data: {
                    arteris: arteris.arteris, via_paulista: viaPaulista.via_paulista
                }
            }
            setUpdateValues(payload)
        }

        if (!!viaPaulista.id && !arteris.id) {
            payload = {
                id: viaPaulista.id,
                data: {
                    via_paulista: viaPaulista.via_paulista
                }
            }
            setUpdateValues(payload)
        }

        if (!!arteris.id && !viaPaulista.id) {
            payload = {
                id: arteris.id,
                data: {
                    arteris: arteris.arteris
                }
            }
            setUpdateValues(payload)
        }

    }

    const handleUpdate = () => {
        dispatchUpdateDer(
            arteris.arteris,
            viaPaulista.via_paulista,
            editRow,
            () => {
                updateRef(updateValues?.id, updateValues?.data);
                setArteris([])
                setViaPaulista([])
                dispatchGetAllDers()
            },
            (error) => console.log(error)
        )
    }

    const ufOptions = [
        {
            "label": "Todos",
            "value": ""
        },
        {
            "label": "ES",
            "value": "es"
        },
        {
            "label": "GO",
            "value": "go"
        },
        {
            "label": "MG",
            "value": "mg"
        },
        {
            "label": "MS",
            "value": "ms"
        },
        {
            "label": "MT",
            "value": "mt"
        },
        {
            "label": "RJ",
            "value": "rj"
        },
        {
            "label": "RS",
            "value": "rs"
        },
        {
            "label": "SC",
            "value": "sc"
        },
        {
            "label": "SP",
            "value": "sp"
        },
        {
            "label": "PR",
            "value": "pr"
        }
    ]


    const Row = ({ index, style }) => {
        const item = data[index]
        return (
            <div style={{ ...style }} className="der_body" key={item.id}>
                <p className="der_row_code">{item?.code}</p>
                <p className="der_row_name">{item?.name.toLowerCase()}</p>
                <p className="der_row_unit">{item?.unit.toUpperCase()}</p>
                <p className="der_row_price">{item?.price}</p>
                <p className="der_row_state">{item?.state}</p>
                {
                    !editRow.includes(item.id) ?
                        <p className="der_row_ref">{item?.arteris}</p>
                        :
                        <div className="der_row_input-container" >
                            <input
                                className="der_row_input"
                                type="text"
                                defaultValue={item?.arteris}
                                onChange={(e) => setArteris({ id: item.id, arteris: e.target.value })}
                            />
                        </div>
                }
                {
                    !editRow.includes(item.id) ?
                        <p className="der_row_ref">{item?.via_paulista}</p>

                        :
                        <div className="der_row_input-container" >
                            <input
                                className="der_row_input"
                                type="text"
                                defaultValue={item?.via_paulista}
                                onChange={(e) => setViaPaulista({ id: item.id, via_paulista: e.target.value })}
                            />
                        </div>
                }
                <div className="der_row_actions">
                    {!editRow.includes(item.id) ?
                        <button className="der_button" onClick={() => setEditRow(item.id)}>
                            <FiIcons.FiEdit size={18} />
                        </button>
                        :
                        <button className="der_button">
                            <FiIcons.FiCheck size={20} color="#105efb" onClick={() => {
                                handleUpdate();
                                setEditRow("")
                            }} />
                        </button>
                    }
                </div>
            </div>
        )
    };

    return (
        <div className="der-page">
            <div>
                <h2 className="der-title">Database / DER</h2>
                <div className="der_search-container">
                    <FiIcons.FiSearch className="der_input_search-icon" size={18} color="516078" />
                    <input className="der_input_search" type="text" placeholder="Buscar pelo código ou nome" onChange={e => { setSearch(e.target.value) }} />
                    <select className="der_input_search-select" placeholder="UF" value={optionsUF} onChange={e => setOptionsUF(e.target.value)}>
                        {ufOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div className="der_container">
                    <div className="der_header">
                        <p className="der_col_code">Código</p>
                        <p className="der_col_name">Nome</p>
                        <p className="der_col_unit">Unidade</p>
                        <p className="der_col_price">Preço</p>
                        <p className="der_col_state">UF</p>
                        <p className="der_col_ref">Arteris</p>
                        <p className="der_col_ref">Via Paulista</p>
                        <p className="der_col_actions">Editar</p>
                    </div>
                    {data.length >= 1 && (
                        <div style={{ height: '60vh', flex: 1 }}>
                            <List
                                width={1200}
                                height={450}
                                rowHeight={35}
                                rowRenderer={Row}
                                rowCount={data.length} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetAllDers: () => dispatch(getAllDers()),
    dispatchUpdateDer: (arteris, via_paulista, derId, onSuccess, onError) =>
        dispatch(updateDer({ arteris, via_paulista }, derId, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    der: state.der,
});

export default connect(mapStateToProps, mapDispatchToProps)(DerPage);
