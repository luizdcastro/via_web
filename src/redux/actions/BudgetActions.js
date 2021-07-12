import * as constants from '../constants';

export const createBudget = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/budget',
        data,        
        success: (response) => createdBudget(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const getBudget = (budgetId) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/budget/${budgetId}`,
        success: (response) => fetchBudget(response),
    },
});

export const getAllBudgets= () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: "/budget",
        success: (response) => fetchaAllBudgets(response),
    },
});

export const updateBudget = (data, budgetId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PATCH',
        url: `/budget/${budgetId}`,
        data,
        success: (response) => updatedBudget(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

export const deleteBudget = (budgetId) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/budget/${budgetId}`,
        success: (response) => deletedBudget(response),
    },
});


const createdBudget = (data) => ({
    type: constants.CREATE_BUDGET,
    payload: data,
});

const fetchBudget = (data) => ({
    type: constants.GET_BUDGET,
    payload: data,
});

const fetchaAllBudgets = (data) => ({
    type: constants.GET_ALL_BUDGETS,
    payload: data,
});

const updatedBudget = (data) => ({
    type: constants.UPDATE_BUDGET,
    payload: data,
});

const deletedBudget = (data) => ({
    type: constants.DELETE_BUDGET,
    payload: data,
});