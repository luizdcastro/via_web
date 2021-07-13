import * as constants from '../constants';

export const createDer = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/der',
        data,        
        success: (response) => createdDer(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const getDer = (derId) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/der/${derId}`,
        success: (response) => fetchDer(response),
    },
});

export const getAllDers= () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: "/der",
        success: (response) => fetchaAllDers(response),
    },
});

export const updateDer = (data, derId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PATCH',
        url: `/der/${derId}`,
        data,
        success: (response) => updatedDer(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const deleteDer = (derId) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/der/${derId}`,
        success: (response) => deletedDer(response),
    },
});


const createdDer = (data) => ({
    type: constants.CREATE_DER,
    payload: data,
});

const fetchDer = (data) => ({
    type: constants.GET_DER,
    payload: data,
});

const fetchaAllDers = (data) => ({
    type: constants.GET_ALL_DERS,
    payload: data,
});

const updatedDer = (data) => ({
    type: constants.UPDATE_DER,
    payload: data,
});

const deletedDer = (data) => ({
    type: constants.DELETE_DER,
    payload: data,
});