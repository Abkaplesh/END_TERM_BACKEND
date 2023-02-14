import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Translate } from "react-auto-translate";
import "./cartcard.css";
import {
  cartdec,
  removeproductcart,
  cartadd,
  subtotal,
} from "../../actions/cartactions";
import { useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Cartcard = (props) => {
  const { img, description, size, productid, title, count, price, id, item } =
    props;

  const [input, setinput] = useState(count);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subtotal(item.discountprice * input, 0));
  }, []);

  return (
    <div className="carts-box">
      <div
        className="remove"
        onClick={() => {
          dispatch(removeproductcart(id));
          dispatch(subtotal(0, item.discountprice * input));
          window.location.reload();
        }}
      >
        X
      </div>
      <div className="carts-imgbox">
        <Link to={`/details/${productid}`}>
          {" "}
          <img src={img} alt={title} />
        </Link>
      </div>
      <div className="carts-quant-box">
        <div classNameName="carts-detail-heading">
          <h1> {title}</h1>
        </div>
        <div className="carts-price">
          <p
            classNameName="subtotals-price"
            style={{
              textAlign: "center",
            }}
          >
            <div>
              <p className="ccartprice"
                style={{
                  color: "#fff",
                  paddingRight: "0rem",
                  fontSize: "1.5rem",
                  textAlign: "center",
                }}
              > <span className="price-strike">{getSymbolFromCurrency(price)}{" "}
                {item.discountprice != undefined ||
                item.discountprice != null ? (
                  <span
                    style={{
                      textDecoration: "line-through",
                      padding: "0.5rem",
                      paddingLeft: "0",
                      display:
                        item.discountprice[0] == item.price[0]
                          ? "none"
                          : "inline",
                    }}
                  >{item.price[0]}{" "}
                  </span>
                ) : (
                  <span></span>
                )}
                </span>
                {getSymbolFromCurrency(price)}{" "}
                {item.discountprice != undefined || item.discountprice != null
                  ? item.discountprice[0]
                  : ""}
              </p>
              <p className="ccartqty" style={{color:"#fff", fontWeight:"500"}}>
              <Translate>QTY : {item.count}</Translate>
                </p>
                <p className="ccartsize" style={{color:"#fff", fontWeight:"500"}}>
                <Translate>Size : {item.weight} ml</Translate>

                  </p>
            </div>
          </p>
        </div>
        <div style={{ display: "none" }} classNameName="carts-quant">
          {input >= 1 && (
            <span
              classNameName="increment"
              onClick={() => {
                setinput(input - 1);
                dispatch(
                  cartdec(
                    id,
                    input - 1,
                    JSON.parse(localStorage.getItem("userInfo")).user
                  )
                );
                dispatch(
                  subtotal(
                    item.discountprice * input,
                    item.discountprice * (input + 1)
                  )
                );
              }}
            >
              <i className="fas fa-minus"></i>
            </span>
          )}
          {/*quant*/}
          <input
            name={"name" + id}
            type="number"
            value={input}
            classNameName="cart-quantity"
            placeholder="Qty"
            min="1"
          />
          <span
            classNameName="decrement"
            onClick={() => {
              setinput(input + 1);
              dispatch(
                cartdec(
                  id,
                  input + 1,
                  JSON.parse(localStorage.getItem("userInfo")).user
                )
              );
              dispatch(
                subtotal(
                  item.discountprice * input,
                  item.discountprice * (input - 1)
                )
              );
            }}
          >
            <i className="fas fa-plus"></i>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Cartcard;
