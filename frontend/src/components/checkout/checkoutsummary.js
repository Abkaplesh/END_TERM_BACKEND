import React, { useEffect } from "react";
import "./checkout.css";
import { Link } from "react-router-dom";
import { Translate } from "react-auto-translate";
import { useDispatch, useSelector } from "react-redux";
import getSymbolFromCurrency from "currency-symbol-map";
import { subtotal, subtotalget } from "../../actions/cartactions";

const Checkoutbox = (props) => {
const dispatch=useDispatch();

  const prices = useSelector((state) => state.priceList);
  const { price } = prices;
  const subtotals = useSelector((state) => state.subtotal);
  const { sub } = subtotals;
  const taxes=useSelector((state)=>state.gettax);
  const {tax}=taxes;


  return (
    <>
      <div className="checkout-box">
        <div className="checkout-box1">
          <div className="checkout-summary-head">
            <h1><Translate>Summary</Translate></h1>
          </div>
          <div className="checkout-summary">
            <summary>
               <Translate>Estimate Shipping and Tax</Translate></summary>
          </div>
        </div>
        <div className="checkout-box2">
          <div className="subtotal">
            <div>
               <Translate>Subtotal</Translate></div>
            <div>
              {getSymbolFromCurrency(price)} {sub}
            </div>
          </div>
          <div className="shipping">
            <div>
               <Translate>Tax</Translate></div>
            <div>{getSymbolFromCurrency(price)} {(sub*tax[price])/100}</div>
          </div>
          

          <div className="ordertotal">
            <div>
               <Translate>Order Total</Translate></div>
            <div>
              {getSymbolFromCurrency(price)} {sub +(sub*tax[price])/100}
            </div>
          </div>
        </div>
        <div className="checkout-box3">
          
          <Link to={props.item <= 0?'/cart':"/checkout"}>
            <button
              onClick={() => {
                
                localStorage.setItem("total", sub+(sub*tax[price])/100);

                localStorage.setItem("tax",(sub*tax[price])/100)
              }}
            >
              
              <Translate>proceed to checkout</Translate>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Checkoutbox;
