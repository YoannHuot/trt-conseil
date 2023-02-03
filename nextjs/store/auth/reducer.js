import { UPDATE_LOGGED } from "./actions";
import { initialState } from "./state";

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LOGGED:
            return {
                ...state,
                logged: action.logged
            };
        default:
            return state;
    }
}
