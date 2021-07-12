import React from 'react'
import { MdCheckCircle, MdError } from 'react-icons/md'
import Ellipsis from '@bit/joshk.react-spinners-css.ellipsis';


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
                            <strong style={{fontSize: 12}}>{uploadedFile.name}</strong>
                            <span >
                                {uploadedFile.readbleSize}                               
                            </span>
                        </div>
                    </FileInfo>
                    <div>
                        {!uploadedFile.uploaded && !uploadedFile.error && (
                           <Ellipsis color="#be97e8" size={45} /> 
                        )}                      
                        {uploadedFile.uploaded && <MdCheckCircle size={22} color="#78e5d5" />}
                        {uploadedFile.error && (<MdError size={22} color="#e57878" />)}
                    </div>
                </li>
            ))}
        </Container>
    )
}

export default FileList