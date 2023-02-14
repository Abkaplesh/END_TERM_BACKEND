import axios from "axios";
import {
  ADD_ITEM_TO_WISHLIST,
  ADD_ITEM_TO_WISHLIST_FAIL,
  ADD_ITEM_TO_WISHLIST_SUCCESS,
  REMOVE_ITEM_FROM_WISHLIST_SUCCESS,
  REMOVE_ITEM_FROM_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST_FAIL,
  WISHLIST_LIST_SUCCESS,
  WISHLIST_LIST_REQUEST,
  WISHLIST_LIST_FAIL,
  
} from "../constant/wishlistconstant";
export const addproductwishlist =
  (
    title,
    image,
    description,
    price,
    weight,
    dimensions,
    
    productId,
    userId
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_ITEM_TO_WISHLIST });

      const { data } = await axios.post(`http://localhost:5000/api/wishlist`, {
        title,
        image,
        description,
        price,
        weight,
        dimensions,
        
        userId,
        productId,
      });
      dispatch({
        type: ADD_ITEM_TO_WISHLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_ITEM_TO_WISHLIST_FAIL,
        payload: [],
      });
    }
  };
export const removeproductwishlist = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_ITEM_FROM_WISHLIST });

    const { data } = await axios.post(`http://localhost:5000/api/wishlistdelete`, {
      id,
      userId: JSON.parse(localStorage.getItem("userInfo")).user,
    });
    dispatch({
      type: REMOVE_ITEM_FROM_WISHLIST_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_FROM_WISHLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getwishlist = (userId) => async (dispatch) => {
  try {
    dispatch({ type: WISHLIST_LIST_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/wishlist/${userId}`
    );

    dispatch({
      type: WISHLIST_LIST_SUCCESS,
      payload: data.user[0].products,
    });
  } catch (error) {
    dispatch({
      type: WISHLIST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



