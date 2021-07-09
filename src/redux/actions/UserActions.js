import * as constants from '../constants';

export const getMe = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/user/me',
        success: (response) => fetchMe(response),
    },
});

const fetchMe = (data) => ({
    type: constants.GET_ME,
    payload: data,
});