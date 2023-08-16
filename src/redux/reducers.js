import { LOGIN, SINGNUP } from "./type";

const initialState = {
    login: 0,
    signupState: null,
    loginState: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loginState: action.payload,

            };
        case SINGNUP:
            return {
                ...state,
                signupState: action.payload,
            };
        default:
            return state;
    }
};