import {ToastAndroid} from 'react-native';

export const COLORS = {

    LIGHT_COLOR: '#ffffff',
    DARK_COLOR: '#24292e'

};

export const GITHUB_API = 'https://api.github.com/users/';


const createError = (res) => {
    const error = new Error();
    if(res.status === 404)
        error.message = 'Username not found!';
    else
        error.message = 'Error ' + res.status + ': ' + res.statusText;
    return error
};


export const fetchData = (Url) => {
    // loading
    return fetch(Url)
        .then(res => {
            if (res.status >= 400)
                throw createError(res);
            else
                return res;
        }, error => {
            throw error
        })
        .then(res => res.json())
        .then(data => data)
};

