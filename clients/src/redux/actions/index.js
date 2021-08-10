const axios = require('axios')

export const getAllGames = () => {
    return (dispatch) => {
         axios.get(`http://localhost:3001/videogames`)
        .then(json => {
            dispatch({type: 'GET_ALL_GAMES', payload:json.data})
        })
    }
}
export const getAllGenres = () => {
    return (dispatch) => {
         axios.get(`http://localhost:3001/genres`)
        .then(json => {
            dispatch({type: 'GET_ALL_GENRES', payload:json.data})
        })
    }
}
export const togglePage = (payload) => {
    return {
        type:'TOGGLE_PAGE',
        payload
    }
}
export const filterGamesperName = (payload) => {
    return {
        type: 'FILTER_GAMES_NAME',
        payload
    }
}
export const filterByAlph = (payload) => {
    return {
        type:'FILTER_ALPH',
        payload
    }
}
export const filterByRating = (payload) => {
    return {
        type:'FILTER_RATING',
        payload
    }
}
export const submitGame = (payload) => {
    return {
        type: 'SUBMIT_GAME',
        payload
    }
}