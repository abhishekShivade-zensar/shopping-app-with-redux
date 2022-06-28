import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = { //setting initial state
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    console.log(`DISPATCHED............ `)
    console.log(`Action is ${action}`)

    const { type, payload } = action //created an action. payload stores the values that the reducer will use to update the state

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }

        default:
            return state
            // throw new Error(`Unknown type received ${type} in the user reducer`)
    }
}
