import * as constants from '../constants';

export const createSicro= (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/sicro',
        data,        
        success: (response) => createdSicro(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const getSicro= (sicroId) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/sicro/${sicroId}`,
        success: (response) => fetchSicro(response),
    },
});

export const getAllSicros= () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: "/sicro",
        success: (response) => fetchaAllSicros(response),
    },
});

export const updateSicro= (data, sicroId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PATCH',
        url: `/sicro/${sicroId}`,
        data,
        success: (response) => updatedSicro(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const deleteSicro= (sicroId) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/sicro/${sicroId}`,
        success: (response) => deletedSicro(response),
    },
});


const createdSicro= (data) => ({
    type: constants.CREATE_SICRO,
    payload: data,
});

const fetchSicro= (data) => ({
    type: constants.GET_SICRO,
    payload: data,
});

const fetchaAllSicros = (data) => ({
    type: constants.GET_ALL_SICROS,
    payload: data,
});

const updatedSicro= (data) => ({
    type: constants.UPDATE_SICRO,
    payload: data,
});

const deletedSicro= (data) => ({
    type: constants.DELETE_SICRO,
    payload: data,
});