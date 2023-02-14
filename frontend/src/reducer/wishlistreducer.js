import {
  ADD_ITEM_TO_WISHLIST,
  ADD_ITEM_TO_WISHLIST_FAIL,
  ADD_ITEM_TO_WISHLIST_SUCCESS,
  WISHLIST_LIST_FAIL,
  WISHLIST_LIST_REQUEST,
  WISHLIST_LIST_SUCCESS,
  REMOVE_ITEM_FROM_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST_FAIL,
  REMOVE_ITEM_FROM_WISHLIST_SUCCESS,
} from "../constant/wishlistconstant";

export const addWishlistReducer = (
  state = { wishlist: [], sub: 0 },
  action
) => {
  switch (action.type) {
    case ADD_ITEM_TO_WISHLIST:
      return { wishlist: [] };
    case ADD_ITEM_TO_WISHLIST_SUCCESS:
      return {
        wishlist: [],
      };

    case ADD_ITEM_TO_WISHLIST_FAIL:
      return { error: action.payload };

    case REMOVE_ITEM_FROM_WISHLIST:
      return { wishlist: state.wishlist };

    case REMOVE_ITEM_FROM_WISHLIST_SUCCESS:
      return {
        wishlist: state.wishlist.filter((item) => item._id !== action.payload),
      };

    case REMOVE_ITEM_FROM_WISHLIST_FAIL:
      return { error: action.payload };

    case WISHLIST_LIST_REQUEST:
      return {
        wishlist: [],
      };

    case WISHLIST_LIST_SUCCESS:
      return { wishlist: action.payload };

    case WISHLIST_LIST_FAIL:
      return { wishlist: [] };

    default:
      return state;
  }
};
