import * as ActionTypes from './ActionTypes';


const initState = {error_msg: '', data: {}, loading: false}

export const userDetails = (state = initState, action) => {

    switch(action.type) {
        case ActionTypes.FETCH_USER_SUCCESS:
            return {...state, data: {
                    username: action.payload.login,
                    image: action.payload.avatar_url,
                    name: action.payload.name,
                    description: action.payload.bio,
                    repos_url: action.payload.repos_url,
                    followers_url: action.payload.followers_url
                },
                error_msg: '',
                loading: false
            };

        case ActionTypes.FETCH_USER_LOADING:
            return {...state, data: {}, error_msg: '', loading: true};

        case ActionTypes.FETCH_USER_FAILED:
            return {...state, data:{}, error_msg: action.payload, loading: false};

        default:
            return state;
    }
};


export const reposData = (state = initState, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_REPOS_SUCCESS:
            const data = [];
            for(const repo of action.payload)
                data.push({name: repo.name, description: repo.description,
                    updated: repo.updated_at, language: repo.language, url: repo.html_url})

            return {...state, data: data, loading: false};

        case ActionTypes.FETCH_REPOS_LOADING:
            return {...state, data: [], error_msg: '', loading: true};

        case ActionTypes.FETCH_REPOS_FAILED:
            return {...state, data: [], error_msg: action.payload, loading: false};

        default:
            return state;
    }
};


export const savedUsers = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.SAVE_USER:
            if(state.some((user) => user === action.payload))
                return state;
            else
                return state.concat(action.payload).reverse();

        case ActionTypes.DELETE_USER:
            return state.filter((user) => user !== action.payload);

        default:
            return state;
    }
};

