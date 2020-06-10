import * as ActionTypes from './ActionTypes';
import {ToastAndroid} from 'react-native';
import {fetchData, GITHUB_API} from '../utils/utils';


const getData = (dispatch, url, actionLoading, actionSuccess, actionFailed) => {
    dispatch(fetchDataLoading(actionLoading));
    return fetchData(url)
        .then(data => {
            dispatch(fetchDataSuccess(data, actionSuccess));
            return true;
        })
        .catch(error => {
            dispatch(fetchDataFailed(error, actionFailed));
            ToastAndroid.show(error.message, ToastAndroid.LONG);
            return false
        });
}

export const getUserData = (user) => (dispatch) => getData(dispatch, GITHUB_API+user,
    ActionTypes.FETCH_USER_LOADING, ActionTypes.FETCH_USER_SUCCESS, ActionTypes.FETCH_USER_FAILED);

export const getReposData = (repos_url) => (dispatch) => getData(dispatch, repos_url,
    ActionTypes.FETCH_REPOS_LOADING, ActionTypes.FETCH_REPOS_SUCCESS, ActionTypes.FETCH_REPOS_FAILED);

const fetchDataSuccess = (data, type) => ({
    type: type,
    payload: data
});

const fetchDataLoading = (type) => ({
    type: type,
    payload: true
});

const fetchDataFailed = (error, type) => ({
    type: type,
    payload: error.message
});


export const saveUser = (userDetails) => (dispatch) => {
    dispatch(pushUser(userDetails));
}

export const deleteUser = (username) => (dispatch) => {
    dispatch(popUser(username));
};


const pushUser = (user) => ({
    type: ActionTypes.SAVE_USER,
    payload: user
});

const popUser = (user) => ({
    type: ActionTypes.DELETE_USER,
    payload: user
})
