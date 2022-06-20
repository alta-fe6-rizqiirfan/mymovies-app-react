const initialState = {
    favorite :[],
    loading : true
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FAVORITE":
            return {
                ...state,
                favorite: action.payload,
                loading : false
            }
        default:
            return state
    }    
}