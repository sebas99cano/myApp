const initialState = {
    countries: [],
    points: 0,
}

const GameReducer = (state = initialState, action) => {
    switch (action.type) {
        case("LOAD_ALL_COUNTRIES_BY_REGION"):
            return ({...state, countries: action.payload})
        case("PLAYER_RESPONSE"):
            return ({...state, points: (state.points + action.payload)})
        default:
            return state;
    }
}

export default GameReducer;