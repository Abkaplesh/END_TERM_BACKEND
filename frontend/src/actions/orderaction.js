import axios from "axios";
import {
  ALL_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ORDER_ADDRESS_POST_FAIL,
  ORDER_ADDRESS_POST_REQUEST,
  ORDER_ADDRESS_POST_SUCCESS,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
  ORDER_POST_FAIL,
  ORDER_POST_SUCCESS,
  ORDER_SHIPPING_METHOD_FAIL,
  ORDER_SHIPPING_METHOD_REQUEST,
  ORDER_SHIPPING_METHOD_SUCCESS,
  REVIEW_GET_FAIL,
  REVIEW_GET_REQUEST,
  REVIEW_GET_SUCCESS,
  REVIEW_SET_FAIL,
  REVIEW_SET_REQUEST,
  REVIEW_SET_SUCCESS,
  SHIPPING_ADDRESS_FAIL,
  SHIPPING_ADDRESS_POST_FAIL,
  SHIPPING_ADDRESS_POST_REQUEST,
  SHIPPING_ADDRESS_POST_SUCCESS,
  SHIPPING_ADDRESS_REQUEST,
  SHIPPING_ADDRESS_SUCCESS,
} from "../constant/orderconstant";
export const shippingaddress =
  (
    firstname,
    lastname,
    address,
    appartment,
    city,
    country,
    state,
    pin,
    phone,
    email,
    userId
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SHIPPING_ADDRESS_POST_REQUEST,
      });

      const { data } = await axios.post(`http://localhost:5000/api/address`, {
        firstname,
        lastname,
        address,
        appartment,
        city,
        country,
        state,
        pin,
        phone,
        email,
        userId,
      });
      dispatch({
        type: SHIPPING_ADDRESS_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SHIPPING_ADDRESS_POST_FAIL,
        payload: [],
      });
    }
  };

export const orderaddress =
  (
    firstname,
    lastname,
    address,
    appartment,
    city,
    country,
    state,
    pin,
    phone,
    email,
    userId
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ORDER_ADDRESS_POST_REQUEST,
      });

      const { data } = await axios.post(
        `http://localhost:5000/api/shippingaddress`,
        {
          firstname,
          lastname,
          address,
          appartment,
          city,
          country,
          state,
          pin,
          phone,
          email,
          userId,
        }
      );
      dispatch({
        type: ORDER_ADDRESS_POST_SUCCESS,
        payload: true,
      });
    } catch (error) {
      dispatch({
        type: ORDER_ADDRESS_POST_FAIL,
        payload: [],
      });
    }
  };

export const shippingmethod = (userId, method) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_SHIPPING_METHOD_REQUEST,
    });

    const { data } = await axios.put(`http://localhost:5000/api/updatemethod`, {
      userId,
      method,
    });
    dispatch({
      type: ORDER_SHIPPING_METHOD_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: ORDER_SHIPPING_METHOD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const shippingaddressget = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: SHIPPING_ADDRESS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/api/address/${userId}`
    );
    dispatch({
      type: SHIPPING_ADDRESS_SUCCESS,
      payload: data.user[0],
    });
  } catch (error) {
    dispatch({
      type: SHIPPING_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderPost =
  (
    userId,

    paymethod,
    payresult,
    tax,
    shippingprice,
    total,
    transid,
    ispaid,
    paidat
  ) =>
  async (dispatch) => {
    try {
      console.log(ispaid);
      const { data } = await axios.post(`http://localhost:5000/api/order`, {
        userId: userId,
        paymentMethod: paymethod,
        paymentResult: payresult,
        taxPrice: tax,
        shippingPrice: shippingprice,
        totalPrice: total,
        transactionId: transid,
        isPaid: ispaid,
        paidAt: paidat,
      });

      dispatch({
        type: ORDER_POST_SUCCESS,
        payload: true,
      });
    } catch (error) {
      dispatch({
        type: ORDER_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const orderlist = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_GET_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/api/order/${userId}`
    );

    dispatch({
      type: ORDER_GET_SUCCESS,
      payload: data.user[data.user.length - 1],
    });
  } catch (error) {
    dispatch({
      type: ORDER_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allorderlist = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_ORDER_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/api/allorder/${userId}`
    );

    dispatch({
      type: ALL_ORDER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getreview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_GET_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:5000/api/review/${id}`);
    console.log(data, id);
    dispatch({
      type: REVIEW_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setreview =
  (review, rate, productid, name) => async (dispatch) => {
    try {
      dispatch({
        type: REVIEW_SET_REQUEST,
      });

      const { data } = await axios.post(`http://localhost:5000/api/review`, {
        review,
        rate,
        productid,
        name,
      });

      dispatch({
        type: REVIEW_SET_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: REVIEW_SET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
