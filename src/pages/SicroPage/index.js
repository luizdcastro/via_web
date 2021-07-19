import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { List } from "react-virtualized";
import * as FiIcons from 'react-icons/fi'

import { getAllSicros, updateSicro } from '../../redux/actions/SicroActions'

import "./styles.css"

const SicroPage = ({ dispatchUpdateSicro, dispatchGetAllSicros, sicro }) => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [editRow, setEditRow] = useState([])
    const [arteris, setArteris] = useState([])
    const [CCR, setCCR] = useState([])
    const [optionsUF, setOptionsUF] = useState("")
    const [updateValues, setUpdateValues] = useState({})

    useEffect(() => {
        dispatchGetAllSicros();
        setData(sicro)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        updatePayload();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arteris, CCR, setUpdateValues])
   
    useEffect(() => {
        if (sicro.length >= 1) {
            setData(
                sicro.filter((sicro) =>
                    (sicro.state?.toLowerCase().includes(optionsUF)) &&
                    (sicro.name?.toLowerCase().includes(search.toLocaleLowerCase()) ||
                        sicro.code?.toLowerCase().includes(search.toLocaleLowerCase())
                    )
                )
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, optionsUF, sicro]);

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

        if (!!arteris.id && !!CCR.id) {
            payload = {
                id: arteris.id,
                data: {
                    arteris: arteris.arteris, CCR: CCR.CCR
                }
            }
            setUpdateValues(payload)
        }

        if (!!CCR.id && !arteris.id) {
            payload = {
                id: CCR.id,
                data: {
                    CCR: CCR.CCR
                }
            }
            setUpdateValues(payload)
        }

        if (!!arteris.id && !CCR.id) {
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
        dispatchUpdateSicro(
            arteris.arteris,
            CCR.CCR,
            editRow,
            () => {
                updateRef(updateValues?.id, updateValues?.data);
                setArteris([])
                setCCR([])
                dispatchGetAllSicros()
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
            <div style={{ ...style }} className="sicro_body" key={item.id}>
                <p className="sicro_row_code">{item?.code}</p>
                <p className="sicro_row_name">{item?.name.toLowerCase()}</p>
                <p className="sicro_row_unit">{item?.unit.toUpperCase()}</p>
                <p className="sicro_row_price">{item?.price}</p>
                <p className="sicro_row_state">{item?.state}</p>
                {
                    !editRow.includes(item.id) ?
                        <p className="sicro_row_ref">{item?.arteris}</p>
                        :
                        <div className="sicro_row_input-container" >
                            <input
                                className="sicro_row_input"
                                type="text"
                                defaultValue={item?.arteris}
                                onChange={(e) => setArteris({ id: item.id, arteris: e.target.value })}
                            />
                        </div>
                }
                {
                    !editRow.includes(item.id) ?
                        <p className="sicro_row_ref">{item?.CCR}</p>

                        :
                        <div className="sicro_row_input-container" >
                            <input
                                className="sicro_row_input"
                                type="text"
                                defaultValue={item?.CCR}
                                onChange={(e) => setCCR({ id: item.id, CCR: e.target.value })}
                            />
                        </div>
                }
                <div className="sicro_row_actions">
                    {!editRow.includes(item.id) ?
                        <button className="sicro_button" onClick={() => setEditRow(item.id)}>
                            <FiIcons.FiEdit size={18} />
                        </button>
                        :
                        <button className="sicro_button">
                            <FiIcons.FiCheck size={20} color="105efb" onClick={() => {
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
        <div className="sicro-page">
            <div>
                <h2 className="sicro-title">Database / Sicro</h2>
                <div className="sicro_search-container">
                    <FiIcons.FiSearch className="sicro_input_search-icon" size={18} color="516078" />
                    <input className="sicro_input_search" type="text" placeholder="Buscar pelo código ou nome" onChange={e => { setSearch(e.target.value) }} />
                    <select className="sicro_input_search-select" placeholder="UF" value={optionsUF} onChange={e => setOptionsUF(e.target.value)}>
                        {ufOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div className="sicro_container">
                    <div className="sicro_header">
                        <p className="sicro_col_code">Código</p>
                        <p className="sicro_col_name">Nome</p>
                        <p className="sicro_col_unit">Unidade</p>
                        <p className="sicro_col_price">Preço</p>
                        <p className="sicro_col_state">UF</p>
                        <p className="sicro_col_ref">Arteris</p>
                        <p className="sicro_col_ref">CCR</p>
                        <p className="sicro_col_actions">Editar</p>
                    </div>
                    {data.length >= 1 && (
                        <div style={{ height: '60vh', flex: 1}}>
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
    dispatchGetAllSicros: () => dispatch(getAllSicros()),
    dispatchUpdateSicro: (arteris, CCR, sicroId, onSuccess, onError) =>
        dispatch(updateSicro({ arteris, CCR }, sicroId, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    sicro: state.sicro,
});

export default connect(mapStateToProps, mapDispatchToProps)(SicroPage);
