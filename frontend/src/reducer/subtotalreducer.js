import {

    STORESUBTOTAL,
    SUBTOTAL,
} from "../constant/cartconstant";

export const subtotal = (state = { sub: 0 }, action) => {
    switch (action.type) {
        case SUBTOTAL:
            return { sub: (state.sub + action.payload.add - action.payload.min) };
        case STORESUBTOTAL:
            return { sub: action.payload };




        default:
            return state;
    }
};
