import React from 'react'
import { Link } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

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
                            <strong>{uploadedFile.name}</strong>
                            <span>
                                {uploadedFile.readbleSize}
                                {!!uploadedFile.id && (
                                    <button onClick={() => { }}>Excluir</button>
                                )}
                            </span>
                        </div>
                    </FileInfo>
                    <div>
                        {!uploadedFile.uploaded && !uploadedFile.error && (
                            <CircularProgressbar
                                styles={{
                                    root: { width: 24 },
                                    path: { stroke: '#7159c1' }
                                }}
                                strokeWidth={10}
                                percentage={uploadedFile.progress}
                            />
                        )}
                        {uploadedFile.uploaded && (
                            <Link to={`/preview/${uploadedFile.id}`} target="_blank">
                                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                            </Link>
                        )}
                        {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                        {uploadedFile.error && (<MdError size={24} color="#e57878" />)}
                    </div>
                </li>
            ))}
        </Container>
    )
}

export default FileList