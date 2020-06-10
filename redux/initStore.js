import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from "@react-native-community/async-storage";
import {persistStore, persistCombineReducers} from "redux-persist";
import {userDetails, reposData, savedUsers} from './reducers';

// export const initStore =createStore(combineReducers({
//     userDetails: userDetails,
//     reposData: reposData,
//     savedUsers: savedUsers}), applyMiddleware(thunk));


export const initStore = () => {

    const config = {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['savedUsers']};

    const store =createStore(persistCombineReducers(config, {
        userDetails: userDetails,
        reposData: reposData,
        savedUsers: savedUsers}), applyMiddleware(thunk));

    const persistor = persistStore(store);
    return{persistor, store}

};
