import axios from "axios";
import { BANNER_FAIL, BANNER_REQUEST, BANNER_SUCCESS } from "../constant/bannerconstant";
export const getbanner = () => async (dispatch) => {
    try {
  
      const { data } = await axios.get(
        `http://localhost:5000/api/banner`
      );
  
      dispatch({
        type: BANNER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: BANNER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };