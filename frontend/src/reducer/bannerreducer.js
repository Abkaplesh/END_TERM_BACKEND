import { BANNER_FAIL, BANNER_REQUEST, BANNER_SUCCESS } from "../constant/bannerconstant";

export const getbanner = (state = { banner: [] }, action) => {
    switch (action.type) {
      
        case BANNER_SUCCESS:
            return { banner: action.payload };
            case BANNER_FAIL:
        return { banner: [] };
  
      default:
        return state;
    }
  }