const initialState = { seenFilms: [] }

function toggleSeen(state: any = initialState, action: any) {
    let nextState: any
    switch(action.type) {
        case 'TOGGLE_SEEN':
            const seenFilmIndex = state.seenFilms.findIndex((film: any) => film.id === action.value.id)
            if (seenFilmIndex !== -1) {
                nextState = {
                    ...state,
                    seenFilms: state.seenFilms.filter((item, index) => index !== seenFilmIndex)
                }
            } else {
                nextState = {
                    ...state,
                    seenFilms: [...state.seenFilms, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleSeen