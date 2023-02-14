import {
  ALL_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ORDER_ADDRESS_POST_FAIL,
  ORDER_ADDRESS_POST_REQUEST,
  ORDER_ADDRESS_POST_SUCCESS,
  ORDER_GET_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
  ORDER_POST_FAIL,
  ORDER_POST_SUCCESS,
  REVIEW_GET_FAIL,
  REVIEW_GET_REQUEST,
  REVIEW_GET_SUCCESS,
  SHIPPING_ADDRESS_FAIL,
  SHIPPING_ADDRESS_POST_FAIL,
  SHIPPING_ADDRESS_POST_REQUEST,
  SHIPPING_ADDRESS_POST_SUCCESS,
  SHIPPING_ADDRESS_REQUEST,
  SHIPPING_ADDRESS_SUCCESS,
} from "../constant/orderconstant";

export const shippingAddressReducre = (
  state = { address: { shippingAddress: {}, address: [] } },
  action
) => {
  switch (action.type) {
    case SHIPPING_ADDRESS_REQUEST:
      return { address: { shippingAddress: {}, address: [] } };
    case SHIPPING_ADDRESS_SUCCESS:
      return { address: action.payload };

    case SHIPPING_ADDRESS_FAIL:
      return { err: action.error };

    default:
      return state;
  }
};

export const postaddress = (state = { post: false }, action) => {
  switch (action.type) {
    case ORDER_ADDRESS_POST_SUCCESS:
      return { post: action.payload };

    default:
      return state;
  }
};

export const order = (state = { status: {} }, action) => {
  switch (action.type) {
    case ORDER_POST_SUCCESS:
      return { status: action.payload };
    case ORDER_POST_FAIL:
      return { status: action.error };

    default:
      return state;
  }
};

export const addOrderListReducer = (state = { orders: null }, action) => {
  switch (action.type) {
    case ORDER_GET_REQUEST:
      return {
        orders: null,
      };

    case ORDER_GET_SUCCESS:
      return { orders: action.payload };

    case ORDER_GET_FAIL:
      return { orders: null };

    default:
      return state;
  }
};

export const allOrderListReducer = (state = { orders: null }, action) => {
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        orders: null,
      };

    case ALL_ORDER_SUCCESS:
      return { orders: action.payload };

    case ALL_ORDER_FAIL:
      return { orders: null };

    default:
      return state;
  }
};

export const getreview = (state = { review: null }, action) => {
  switch (action.type) {
    case REVIEW_GET_REQUEST:
      return {
        review: null,
      };

    case REVIEW_GET_SUCCESS:
      return { review: action.payload };

    case REVIEW_GET_FAIL:
      return { review: null };

    default:
      return state;
  }
};
