
import React, { useState } from 'react'
import { connect } from "react-redux";
import UploadFile from '../../components/UploadFile'
import FileList from '../../components/FileList'
import { uniqueId } from 'lodash'
import fileSize from 'filesize'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
import TextField from '@material-ui/core/TextField';
import { Ellipsis } from 'react-css-spinners'
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import ufOptions from '../../assets/data/ufOptions.json';

import { createBudget, getAllBudgets } from '../../redux/actions/BudgetActions'

import './styles.css'

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            decimalSeparator="."
            fixedDecimalScale
            isNumericString
            suffix="%"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const ImportPage = ({ dispatchCreateBudget }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [optionsUF, setOptionsUF] = useState("")
    const [database, setDatabase] = useState("")
    const [company, setCompany] = useState("")
    const [loading, setLoading] = useState(false)
    const [sucessMessage, setSucessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [values, setValues] = useState({
        textmask: '',
        numberformat: '',
    });

    function download(data) {
        const worksheet = XLSX.utils.json_to_sheet(data)
        const worbook = {
            Sheets: {
                'data': worksheet
            },
            SheetNames: ['data']
        }
        const excelBuffer = XLSX.write(worbook, { bookType: 'xlsx', type: 'array' })
        saveAsExcel(excelBuffer)
    }

    function saveAsExcel(buffer) {
        const data = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
        saveAs(data, 'orçamento_export_' + new Date().getTime())
    }

    const handleUpload = (files) => {
        const fileUpload = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readbleSize: fileSize(file.size),
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
            const result = XLSX.utils.sheet_to_json(ws, {
                defval: null
            })
            item.table = result
            if (!item.uploaded && item.table.length >= 1) {
                updateFile(item.id, {
                    uploaded: true
                })
            }

        }
    };

    const handleSubmmit = (item) => {
        setLoading(true)
        dispatchCreateBudget(
            { table: item.table, company: company, database: database, state: optionsUF, tax: values.numberformat },
            (response) => {
                download(response.data);
                setLoading(false);
                setUploadedFiles([])
                setSucessMessage(true)
            },
            (error) => {
                setLoading(false);
                setErrorMessage(true)
                console.log(error)
            }
        )
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
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
        <div className="budget-page">
            <div>
                <h2 className="budget-title">Orçamento</h2>
                <p className="budget-db-select-label">Dados para criação da cotação</p>
                <div className="budget-input-data">
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
                    <TextField
                        label="Empresa"
                        select
                        size="small"
                        variant="outlined"
                        inputProps={{ style: { fontSize: 13 } }}
                        InputLabelProps={{ style: { fontSize: 13 } }}
                        SelectProps={{
                            native: true,
                        }}
                        style={{ width: 325, marginTop: 10 }}
                        onChange={e => setCompany(e.target.value)}
                    >
                        <option value="" defaultValue hidden></option>
                        <option className="option-select-item" value="arteris">Arteris</option>
                        <option value="CCR">CCR</option>
                    </TextField>
                    <TextField
                        label="BDI"
                        name="numberformat"
                        id="formatted-numberformat-input"
                        size="small"
                        variant="outlined"
                        style={{ width: 325, marginTop: 15 }}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        onChange={handleChange}
                        value={values.numberformat}
                        inputProps={{
                            maxLength: 4,
                            style: { fontSize: 13 }
                        }}
                        InputLabelProps={{ style: { fontSize: 13 } }}
                    />
                    <div className="budget-upload-container">
                        <UploadFile onUpload={handleUpload} />
                        {uploadedFiles.length > 0 ? <FileList files={uploadedFiles} /> : null}
                    </div>
                    {
                        !!database & !!optionsUF & uploadedFiles[0]?.uploaded  & !!company & !!values ?
                            <button id="budget-create-button" disabled={loading ? true : false} onClick={() => handleSubmmit(uploadedFiles[0])}>
                                {
                                    !loading ? 'Gerar Orçamento' : <span><Ellipsis color="#FFF" size={42} /></span>
                                }
                            </button>
                            :
                            <button id="budget-create-button-disabled" disabled>Gerar Orçamento</button>
                    }
                </div>
                {sucessMessage && (<p className="budget-sucess-message">Orçamento criado com sucesso</p>)}
                {errorMessage && (<p className="budget-error-message">Um erro ocorreu durante a criação do orçamento</p>)}
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetAllBudgets: () => dispatch(getAllBudgets()),
    dispatchCreateBudget: (budget, onSuccess, onError) =>
        dispatch(createBudget({ budget }, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    budget: state.budget,
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportPage);