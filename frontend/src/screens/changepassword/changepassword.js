import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { passchange } from "../../actions/useraction";

export const ChangePass = () => {
  const [pass, setpass] = useState("");
  const { userId, token } = useParams();
  /*const passwordchange=useSelector((state) => state.passchange);
const {change}=passwordchange;*/

  const dispatch = useDispatch();

  const changeHandler2 = (e) => {
    setpass(e.target.value);
  };

  return (
    <div>
      <input
        value={pass}
        onChange={changeHandler2}
        style={{ width: "40.7%", padding: "1rem", margin: "0.5rem" }}
        type="text"
        placeholder="New Password"
      />
      <button
        onClick={() => {
          dispatch(passchange(pass, userId, token));
        }}
      >
        Change
      </button>
    </div>
  );
};
