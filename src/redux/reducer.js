
function reducer(state = null, action) {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, actorName: action.payload };
        default:
            return state;
    }
}

export default reducer;
