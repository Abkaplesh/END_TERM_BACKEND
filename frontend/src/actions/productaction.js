import {
  DETAIL,
  FAIL_DETAILS,
  PRICE_LIST_FAIL,
  PRICE_LIST_REQUEST,
  PRICE_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  REQUEST_DETAILS,
} from "../constant/productconstant";
import axios from "axios";
export const listProducts =
  (
    keyword = "",
    pageNumber = "",
    brands = "",
    price = { min: 0, max: 99999999 }
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(`http://localhost:5000/api/product`);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
//price
export const listPrice = () => async (dispatch) => {
  try {
    dispatch({ type: PRICE_LIST_REQUEST });

    const { data } = await axios.get("https://ipapi.co/json/");
    dispatch({
      type: PRICE_LIST_SUCCESS,
      payload:
        data.currency == "SAR" ? "SAR" : data.currency == "INR" ? "INR" : "AED",
    });
  } catch (error) {
    dispatch({
      type: PRICE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const details = (productid) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_DETAILS });

    const { data } = await axios.get(
      `http://localhost:5000/api/detail/${productid}`
    );

    dispatch({
      type: DETAIL,
      payload: { data: data.user[0], pricess: data.user[0].price },
    });
  } catch (error) {
    dispatch({
      type: FAIL_DETAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
