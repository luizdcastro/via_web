import * as constants from '../constants';

export const getMe = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/user/me',
        success: (response) => fetchMe(response),
    },
});

export const updateUser = (data, userId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PATCH',
        url: `/user/update/${userId}`,
        data,
        success: (response) => updatedUser(response),
        postProccessSuccess: onSuccess,
        postProccessError: onError,
    },
});

const fetchMe = (data) => ({
    type: constants.GET_ME,
    payload: data.data,
});

const updatedUser = (data) => ({
    type: constants.UPDATE_ME,
    payload: data,
});