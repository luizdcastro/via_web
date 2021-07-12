import React from 'react';
import Dropzone from 'react-dropzone'
import { DropContainer, UploadMessage } from './styles'

const UploadFile = ({onUpload}) => {

    const renderDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return <UploadMessage>Arraste sua planinha aqui</UploadMessage>
        }
        if (isDragReject) {
            return <UploadMessage type="error">Arquino não suportado</UploadMessage>
        }
        return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>
    } 

    return (

        <Dropzone
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onDropAccepted={onUpload} multiple={false} >
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <DropContainer
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                >
                    <input type="file" {...getInputProps()} />
                    {renderDragMessage(isDragActive, isDragReject)}
                </DropContainer>
            )}
        </Dropzone>

    )
}

export default UploadFile

