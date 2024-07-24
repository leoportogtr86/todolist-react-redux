const initialState = {
    items: []
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {...state, items: [...state.items, action.payload]};
        case "REMOVE_TODO":
            return {...state, items: state.items.filter((todo, index) => index !== action.payload)};
        default:
            return state;
    }
}

export default todoReducer;