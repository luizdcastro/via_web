import * as constants from '../constants';

export const createTable = (data, onUploadProgress, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/table',
        data,        
        success: (response) => createdTable(response),
        onUploadProgress: onUploadProgress,
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const getTable = (tableId) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/table/${tableId}`,
        success: (response) => fetchTable(response),
    },
});

export const getAllTables= () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: "/table",
        success: (response) => fetchaAllTables(response),
    },
});

export const updateTable = (data, tableId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PATCH',
        url: `/table/${tableId}`,
        data,
        success: (response) => updatedTable(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const deleteTable = (tableId) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/table/${tableId}`,
        success: (response) => deletedTable(response),
    },
});


const createdTable = (data) => ({
    type: constants.CREATE_TABLE,
    payload: data,
});

const fetchTable = (data) => ({
    type: constants.GET_TABLE,
    payload: data,
});

const fetchaAllTables = (data) => ({
    type: constants.GET_ALL_TABLES,
    payload: data,
});

const updatedTable = (data) => ({
    type: constants.UPDATE_TABLE,
    payload: data,
});

const deletedTable = (data) => ({
    type: constants.DELETE_TABLE,
    payload: data,
});