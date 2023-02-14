
import { LOGIN_DISPLAY_FLEX, LOGIN_DISPLAY_NONE, NEW_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constant/user";


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload.success,logined:true };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload,logined:false };
        case USER_LOGOUT:
            return { loading: false, userInfo: false }
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const resetPassword = (state = { change: false }, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return { change: false };
        case RESET_PASSWORD_SUCCESS:
            return { change: action.payload };
        case RESET_PASSWORD_FAIL:
            return { change: action.payload };
        default:
            return state;
    }
}

export const passchange = (state = { change: false }, action) => {
    switch (action.type) {
        case NEW_PASSWORD_REQUEST:
            return { change: false };
        case NEW_PASSWORD_SUCCESS:
            return { change: action.payload };
        case NEW_PASSWORD_FAIL:
            return { change: action.payload };
        default:
            return state;
    }
}

export const logindisplay = (state = { display: "none" }, action) => {
    switch (action.type) {
        case LOGIN_DISPLAY_FLEX:
            return { display: "flex" };
        case LOGIN_DISPLAY_NONE:
            return { display: "none" };
        default:
            return state;
    }
}