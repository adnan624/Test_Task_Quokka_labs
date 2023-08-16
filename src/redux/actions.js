import { LOGIN, SINGNUP } from "./type";

export const login = (payload) => ({
    type: LOGIN,
    payload: payload,
});

export const signup = (payload) => ({
    type: SINGNUP,
    payload: payload,
});