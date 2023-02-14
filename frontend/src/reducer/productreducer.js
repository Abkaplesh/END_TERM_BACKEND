import { DETAIL, FAIL_DETAILS, PRICE_LIST_FAIL, PRICE_LIST_REQUEST, PRICE_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, REQUEST_DETAILS } from "../constant/productconstant";

export const productListReducer = (
    state = { products: [], filter_products: [] },
    action
  ) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, products: [] };
      case PRODUCT_LIST_SUCCESS:
        return {
          loading: false,
          products: action.payload
         // filter_products: state.filter_products,
          //pages: action.payload.pages,
          //page: action.payload.page,
          //count: action.payload.count,
        };
      case "CATEGORY_PRODUCT_LIST_SUCCESS":
        return {
          loading: false,
          filter_products: action.payload,
         // pages: action.payload.pages,
         // page: action.payload.page,
         // count: action.payload.count,
        };
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const priceListReducer = (
    state = { price: "" },
    action
  ) => {
    switch (action.type) {
      case PRICE_LIST_REQUEST:
        return { loading: true, price: "" };
      case PRICE_LIST_SUCCESS:
        return {
          loading: false,
          price: action.payload
         // filter_products: state.filter_products,
          //pages: action.payload.pages,
          //page: action.payload.page,
          //count: action.payload.count,
        };
      case PRICE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const details = (
    state = { detail: null },
    action
  ) => {
    switch (action.type) {
      case REQUEST_DETAILS:
        return { detail:null };
      case DETAIL:
        return {
          detail:action.payload.data,pricess:action.payload.pricess
        };
      case FAIL_DETAILS:
        return { error: action.payload };
      default:
        return state;
    }
  };