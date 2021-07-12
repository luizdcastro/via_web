
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import UploadFile from '../../components/UploadFile'
import FileList from '../../components/FileList'
import { uniqueId } from 'lodash'
import fileSize from 'filesize'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';


import { createBudget, getAllBudgets } from '../../redux/actions/BudgetActions'

import './styles.css'

const ImportPage = ({ dispatchCreateBudget, dispatchGetAllBudgets }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [budgetFilled, setBudgetFilled] = useState([])
    const [optionsUF, setOptionsUF] = useState("")
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

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

    function saveAsExcel(buffer, filename) {
        const data = new Blob([buffer], { type: EXCEL_TYPE })
        saveAs(data, filename + '_export_' + new Date().getTime())
    }

    const handleUpload = (files) => {
        const fileUpload = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readbleSize: fileSize(file.size),
            progress: 0,
            uploaded: false,
            error: false,
            budget: []
        }))

        setUploadedFiles((uploadedFiles.concat(fileUpload)))
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
            item.budget = result

            if (!item.uploaded && item.budget.length >= 1) {
                handleSubmmit(item.budget)
                item.uploaded = true
            }
        }
    };

    const handleSubmmit = (item) => {
        dispatchCreateBudget(
            item,
            (response) =>  download(response.data),
            (error) => console.log(error)
        )       
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

    const ufOptions = [
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

    return (
        <div className="budget-page">
            <div>
                <h2 className="budget-title">Orçamento</h2>
                <p className="budget-db-select-label">Selecionar DB e UF</p>
                <select className="budget-db-select" value="">
                    <option key="dr" value="dr">DR</option>
                </select>
                <select className="budget-uf-select" placeholder="UF" value={optionsUF} onChange={e => setOptionsUF(e.target.value)}>
                    {ufOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <p className="budget-db-select-label">Importar Tabela</p>
                <div className="upload-container">
                    <UploadFile onUpload={handleUpload} />
                    {uploadedFiles.length > 0 ? <FileList files={uploadedFiles} /> : null}
                </div>
                <button onClick={() => dispatchGetAllBudgets()}>Get Budget</button>
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