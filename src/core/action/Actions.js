export const loadAllCountriesByRegion = (countries) => {
    return ({
        type: "LOAD_ALL_COUNTRIES_BY_REGION",
        payload: countries,
    })
}

export const playerResponse = (points) => {
    return ({
        type: "PLAYER_RESPONSE",
        payload: points,
    })
}
