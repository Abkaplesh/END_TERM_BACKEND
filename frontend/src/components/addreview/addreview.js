import getSymbolFromCurrency from "currency-symbol-map";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setreview } from "../../actions/orderaction";
import { listPrice } from "../../actions/productaction";
import "./addreview.css";

export const Addreview = (props) => {
  const [text, settext] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    settext(e.target.value);
  };

  const prices = useSelector((state) => state.priceList);

  const { price } = prices;

  useEffect(() => {
    dispatch(listPrice());
  }, [dispatch]);

  const [rate, setrate] = useState(0);

  const changeHandler1 = (e) => {
    setrate(e.target.value);
  };

  return (
    <div className="reviewcardbox">
      <div className="reviewcardbox-img">
        <img
          style={{ width: "100px", height: "90px"}}
          src={props.item.image}
        />
        
      </div>
      <div className="reviewcardbox-title">{props.item.title}</div>
      <h3 className="reviewcardbox-price">
      {getSymbolFromCurrency(price)} {props.item.discountprice[0]}
        </h3>
      <div class="rate" name={`rate${props.index}`} onChange={changeHandler1}>
      <input
          type="radio"
          id={`star1${props.index}`}
          name={`rate${props.index}`}
          value="1"
        />
        <label for={`star1${props.index}`} title="text">
          1 star
        </label>
        
        <input
          type="radio"
          id={`star2${props.index}`}
          name={`rate${props.index}`}
          value="2"
        />
        <label for={`star2${props.index}`} title="text">
          2 stars
        </label>
        
        <input
          type="radio"
          id={`star3${props.index}`}
          name={`rate${props.index}`}
          value="3"
        />
        <label for={`star3${props.index}`} title="text">
          3 stars
        </label>
        <input
          type="radio"
          id={`star4${props.index}`}
          name={`rate${props.index}`}
          value="4"
        />
        <label for={`star4${props.index}`} title="text">
          4 stars
        </label>
        <input
          type="radio"
          id={`star5${props.index}`}
          name={`rate${props.index}`}
          value="5"
        />
        <label for={`star5${props.index}`} title="text">
          5 stars
        </label>
        
      </div>
      <input
        type="text"
        value={text}
        onChange={changeHandler}
        className="reviewcardbox-input"
      />
      <button
        type="submit"
        className="reviewcardbox-btn"
        onClick={() => {
          dispatch(
            setreview(text, rate, props.item.productId, props.name.firstname)
          );
        }}
      >
        Submit
      </button>
    </div>
  );
};
