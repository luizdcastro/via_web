
import React, { useState } from 'react'
import { connect } from "react-redux";
import UploadFile from '../../components/UploadFile'
import FileList from '../../components/FileList'
import TextField from '@material-ui/core/TextField';
import { uniqueId } from 'lodash'
import fileSize from 'filesize'
import * as XLSX from 'xlsx'
import ufOptions from '../../assets/data/ufOptions.json';
import { Ellipsis } from 'react-css-spinners'

import { createDer, getAllDers } from '../../redux/actions/DerActions'
import { createSicro, getAllSicros } from '../../redux/actions/SicroActions'

import './styles.css'

const ImportPage = ({ dispatchCreateDer, dispatchCreateSicro, dispatchGetAllDers, dispatchGetAllSicros }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [optionsUF, setOptionsUF] = useState("")
    const [database, setDatabase] = useState("")
    const [loading, setLoading] = useState(false)
    const [sucessMessage, setSucessMessage]  = useState(false)    
    const [errorMessage, setErrorMessage] = useState(false)

    const handleUpload = (files) => {
        const fileUpload = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readbleSize: fileSize(file.size),
            progress: 0,
            uploaded: false,
            error: false,
            table: []
        }))
        setUploadedFiles(fileUpload)
        setSucessMessage(false)     
        setErrorMessage(false)      
    }

    for (const item of uploadedFiles) {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(item.file)

        fileReader.onload = (e) => {
            const bufferArray = e.target.result

            const wb = XLSX.read(bufferArray, { type: 'buffer' })
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            const result = XLSX.utils.sheet_to_json(ws)
            item.table = result

            if (!item.uploaded && item.table.length >= 1) {
                updateFile(item.id, {
                    uploaded: true
                })
            }
        }
    };

    const handleSubmmit = (item) => {

        if (database === 'der') {
            setLoading(true)
            dispatchCreateDer(
                { table: item.table, state: optionsUF },
                (response) => {
                    setLoading(false);
                    dispatchGetAllDers();                  
                    setUploadedFiles([])
                    setSucessMessage(true)
                },
                (error) => {
                    setLoading(false);
                    setErrorMessage(true)
                }

            )
        }

        if (database === 'sicro') {
            setLoading(true)
            dispatchCreateSicro(
                { table: item.table, state: optionsUF },
                (response) => {
                    setLoading(false);
                    dispatchGetAllSicros();                  
                    setUploadedFiles([])
                    setSucessMessage(true)
                },
                (error) => {
                    setLoading(false);
                    setErrorMessage(true)
                }
            )
        }
    }

    const updateFile = (id, data) => {
        setUploadedFiles(
            uploadedFiles.map((uploadedFiles) => {
                return id === uploadedFiles.id
                    ? { ...uploadedFiles, ...data }
                    : uploadedFiles;
            })
        );
    };

    return (
        <div className="import-page">
            <div>
                <h2 className="homepage-title">Importar</h2>
                <p className="import-db-select-label">Dados para atualização do DB</p>
                <div className="import-input-data">
                    <TextField
                        label="Database"
                        select
                        size="small"
                        variant="outlined"
                        inputProps={{ style: { fontSize: 13 } }}
                        InputLabelProps={{ style: { fontSize: 13, } }}
                        SelectProps={{
                            native: true,
                        }}
                        style={{ width: 325, marginTop: 15 }}
                        onChange={(e) => setDatabase(e.target.value)}
                    >
                        <option value="" defaultValue hidden></option>
                        <option className="option-select-item" value="der">DER</option>
                        <option className="option-select-item" value="sicro">Sicro</option>
                    </TextField>
                    <TextField
                        label="UF"
                        select
                        size="small"
                        variant="outlined"
                        inputProps={{ style: { fontSize: 13 } }}
                        InputLabelProps={{ style: { fontSize: 13 } }}
                        SelectProps={{
                            native: true,
                        }}
                        style={{ width: 325, marginTop: 15 }}
                        onChange={e => setOptionsUF(e.target.value)}
                    >
                        <option value="" defaultValue hidden></option>
                        {ufOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </TextField>
                    <div className="budget-upload-container">
                        <UploadFile onUpload={handleUpload} />
                        {uploadedFiles.length > 0 ? <FileList files={uploadedFiles} /> : null}
                    </div>
                    {
                        !!database & !!optionsUF & uploadedFiles[0]?.uploaded ?
                            <button id="budget-create-button" disabled={loading ? true : false}  onClick={() => handleSubmmit(uploadedFiles[0])}>
                                {
                                    !loading ? 'Importar Dados' : <span> <Ellipsis color="#FFF" size={42} /></span>
                                }
                            </button>
                            :
                            <button id="budget-create-button-disabled" disabled>Importar Dados</button>
                    }

                </div>
                {sucessMessage && (<p className="import-sucess-message">Database atualizado com sucesso</p>) }       
                {errorMessage && (<p className="import-error-message">Um erro ocorreu durante atualização</p>) }            
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetAllDers: () => dispatch(getAllDers()),
    dispatchCreateDer: (der, onSuccess, onError) =>
        dispatch(createDer({ der }, onSuccess, onError)),
    dispatchGetAllSicros: () => dispatch(getAllSicros()),
    dispatchCreateSicro: (sicro, onSuccess, onError) =>
        dispatch(createSicro({ sicro }, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    der: state.der,
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportPage);