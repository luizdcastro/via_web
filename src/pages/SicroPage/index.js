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
    const [viaPaulista, setViaPaulista] = useState([])
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
    }, [arteris, viaPaulista, setUpdateValues])
   
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
        dispatchUpdateSicro(
            arteris.arteris,
            viaPaulista.via_paulista,
            editRow,
            () => {
                updateRef(updateValues?.id, updateValues?.data);
                setArteris([])
                setViaPaulista([])
                dispatchGetAllSicros()
            },
            (error) => console.log(error)
        )
    }

    const ufOptions = [
        {
            label: "Todos",
            value: ""
        },
        {
            label: "PR",
            value: "pr"
        },
        {
            label: "SP",
            value: "sp"
        },
        {
            label: "RS",
            value: "rs"
        },
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
                        <p className="sicro_row_ref">{item?.via_paulista}</p>

                        :
                        <div className="sicro_row_input-container" >
                            <input
                                className="sicro_row_input"
                                type="text"
                                defaultValue={item?.via_paulista}
                                onChange={(e) => setViaPaulista({ id: item.id, via_paulista: e.target.value })}
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
                        <p className="sicro_col_ref">Via Paulista</p>
                        <p className="sicro_col_actions">Editar</p>
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
    dispatchGetAllSicros: () => dispatch(getAllSicros()),
    dispatchUpdateSicro: (arteris, via_paulista, sicroId, onSuccess, onError) =>
        dispatch(updateSicro({ arteris, via_paulista }, sicroId, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    sicro: state.sicro,
});

export default connect(mapStateToProps, mapDispatchToProps)(SicroPage);
