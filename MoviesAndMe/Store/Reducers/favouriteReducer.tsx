const initialState = { favouriteFilms: [] }

function toggleFavourite(state: any = initialState, action: any) {
    let nextState: any
    switch (action.type) {
        case 'TOGGLE_FAVOURITE':
            const favouriteFilmIndex = state.favouriteFilms.findIndex((film: any) => film.id === action.value.id)
            if (favouriteFilmIndex !== -1) {
                nextState = {
                    ...state,
                    favouriteFilms: state.favouriteFilms.filter((item, index) => index !== favouriteFilmIndex)
                }
            } else {
                nextState = {
                    ...state,
                    favouriteFilms: [...state.favouriteFilms, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleFavourite