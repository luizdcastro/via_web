import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { List } from "react-virtualized";
import * as FiIcons from 'react-icons/fi'

import { getAllTables, updateTable } from '../../redux/actions/TableActions'

import "./styles.css"

const DatabasePage = ({ dispatchUpdateTable, dispatchGetAllTables, table }) => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [editRow, setEditRow] = useState([])
    const [arteris, setArteris] = useState([])
    const [viaPaulista, setViaPaulista] = useState([])
    const [optionsUF, setOptionsUF] = useState("")
    const [updateValues, setUpdateValues] = useState({})

    useEffect(() => {
        dispatchGetAllTables();
        setData(table)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        updatePayload();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arteris, viaPaulista, setUpdateValues])

    useEffect(() => {

        if (table.length >= 1) {
            setData(
                table.filter((table) =>
                    (table.state?.toLowerCase().includes(optionsUF)) &&
                    (table.name?.toLowerCase().includes(search.toLocaleLowerCase()) ||
                        table.code?.toLowerCase().includes(search.toLocaleLowerCase())
                    )
                )
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, optionsUF]);

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
        dispatchUpdateTable(
            arteris.arteris,
            viaPaulista.via_paulista,
            editRow,
            () => {
                updateRef(updateValues?.id, updateValues?.data);
                setArteris([])
                setViaPaulista([])
                dispatchGetAllTables()
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
            <div style={{ ...style }} className="table_body" key={item.id}>
                <p className="table_row_code">{item?.code}</p>
                <p className="table_row_name">{item?.name.toLowerCase()}</p>
                <p className="table_row_unit">{item?.unit.toUpperCase()}</p>
                <p className="table_row_price">{item?.price}</p>
                <p className="table_row_state">{item?.state}</p>
                {
                    !editRow.includes(item.id) ?
                        <p className="table_row_ref">{item?.arteris}</p>
                        :
                        <div className="table_row_input-container" >
                            <input
                                className="table_row_input"
                                type="text"
                                defaultValue={item?.arteris}
                                onChange={(e) => setArteris({ id: item.id, arteris: e.target.value })}
                            />
                        </div>
                }
                {
                    !editRow.includes(item.id) ?
                        <p className="table_row_ref">{item?.via_paulista}</p>

                        :
                        <div className="table_row_input-container" >
                            <input
                                className="table_row_input"
                                type="text"
                                defaultValue={item?.via_paulista}
                                onChange={(e) => setViaPaulista({ id: item.id, via_paulista: e.target.value })}
                            />
                        </div>
                }
                <div className="table_row_actions">
                    {!editRow.includes(item.id) ?
                        <button className="table_button" onClick={() => setEditRow(item.id)}>
                            <FiIcons.FiEdit size={18} />
                        </button>
                        :
                        <button className="table_button">
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
        <div className="database-page">
            <div>
                <h2 className="database-title">Database</h2>
                <div className="table_search-container">
                    <FiIcons.FiSearch className="table_input_search-icon" size={18} color="516078" />
                    <input className="table_input_search" type="text" placeholder="Buscar pelo código ou nome" onChange={e => { setSearch(e.target.value) }} />
                    <select className="table_input_search-select" placeholder="UF" value={optionsUF} onChange={e => setOptionsUF(e.target.value)}>
                        {ufOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div className="table_container">
                    <div className="table_header">
                        <p className="table_col_code">CÓDIGO</p>
                        <p className="table_col_name">NOME</p>
                        <p className="table_col_unit">UNIDADE</p>
                        <p className="table_col_price">PREÇO</p>
                        <p className="table_col_state">UF</p>
                        <p className="table_col_ref">ARTERIS</p>
                        <p className="table_col_ref">VIA PAULISTA</p>
                        <p className="table_col_actions"></p>
                    </div>
                    {data.length >= 1 && (
                        <div style={{ height: '60vh', flex: 1 }}>
                            <List
                                width={1100}
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
    dispatchGetAllTables: () => dispatch(getAllTables()),
    dispatchUpdateTable: (arteris, via_paulista, tableId, onSuccess, onError) =>
        dispatch(updateTable({ arteris, via_paulista }, tableId, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    table: state.table,
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabasePage);
