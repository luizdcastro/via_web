
import React, { useState } from 'react'
import { connect } from "react-redux";
import UploadFile from '../../components/UploadFile'
import FileList from '../../components/FileList'
import { uniqueId } from 'lodash'
import fileSize from 'filesize'
import * as XLSX from 'xlsx'

import { createTable, getAllTables } from '../../redux/actions/TableActions'

import './styles.css'

const ImportPage = ({ dispatchCreateTable, dispatchGetAllTables }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

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
            const result = XLSX.utils.sheet_to_json(ws)
            item.table = result

            if (!item.uploaded && item.table.length >= 1) {
                handleSubmmit(item)
                item.uploaded = true
            }
        }
    };

    const handleSubmmit = (item) => {
        dispatchCreateTable(
            item.table,
            (event) => {
                const progress = parseInt(Math.round((event.loaded * 100) / event.total));
                item.progress = progress
            },
            (response) => {
                updateFile(item.id, {
                    id: response.data.id,
                });
                dispatchGetAllTables()
            },
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

    return (
        <div className="import-page">
            <div>
                <h2 className="homepage-title">Atualizar</h2>
                <p className="import-db-select-label">Selecionar DB</p>
                <select className="import-db-select" value="">
                    <option key="dr" value="dr">DR</option>
                </select>
                <p className="import-db-select-label">Importar Tabelas</p>
                <div className="upload-container">
                    <UploadFile onUpload={handleUpload} />
                    {uploadedFiles.length > 0 ? <FileList files={uploadedFiles} /> : null}
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetAllTables: () => dispatch(getAllTables()),
    dispatchCreateTable: (table, onUploadProgress, onSuccess, onError) =>
        dispatch(createTable({ table }, onUploadProgress, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    table: state.table,
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportPage);