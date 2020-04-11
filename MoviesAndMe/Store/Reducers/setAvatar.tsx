const initialState = { avatar: require('../../Images/ic_tag_faces.png') }

function setAvatar(state: any = initialState, action: any) {
    let nextState: any
    switch(action.type) {
        case 'SET_AVATAR':
            nextState = {
                ...state,
                avatar: action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default setAvatar