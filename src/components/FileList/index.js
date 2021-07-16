import React from 'react'
import * as FiIcons from 'react-icons/fi'
import { Ellipsis } from 'react-css-spinners'


import { Container, FileInfo, Preview } from './styles'
import ExcelIcon from '../../assets/icons/excel.png'

const FileList = ({ files }) => {

    return (
        <Container>
            {files.map(uploadedFile => (
                <li>
                    <FileInfo>
                        <Preview src={ExcelIcon} />
                        <div>
                            <strong style={{fontSize: 11}}>{uploadedFile.name}</strong>
                            <span >
                                {uploadedFile.readbleSize}                               
                            </span>
                        </div>
                    </FileInfo>
                    <div style={{display: 'flex'}}>
                        {!uploadedFile.uploaded && !uploadedFile.error && (
                           <Ellipsis color="#516078" size={29} /> 
                        )}                      
                        {uploadedFile.uploaded && <FiIcons.FiCheckSquare size={21} color="#43A047" />}
                        {uploadedFile.error && (<FiIcons.FiAlertTriangle size={21} color="#E53935" />)}
                    </div>
                </li>
            ))}
        </Container>
    )
}

export default FileList