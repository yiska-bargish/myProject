import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import { useHistory } from "react-router-dom";
import { getStepButtonUtilityClass } from "@mui/material";

export default function Cart() {

  const history = useHistory();
  const [sum, setSum] = useState();
  const [buy, setBuy] = useState(false);
  const data = useSelector((state) => state.product);
  const dataUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    debugger;
    let s = 0;
    data?.shoppingCart?.forEach((item) => {
      s +=
        Number(data?.products?.find((x) => x._id == item.id)?.price) *
        item.count;
    });
    setSum(s);
  }, [data?.shoppingCart]);

  async function func(e) {
    debugger;
    e.preventDefault();
    let user = {};
    user.userName = e.target.userName.value || dataUser?.currentUser?.userName;
    user.phone = e.target.phone.value || dataUser?.currentUser?.phone;
    user.email = e.target.email.value || dataUser?.currentUser?.email;
    user.address = e.target.address.value || dataUser?.currentUser?.address;
    user.password = e.target.password.value || dataUser?.currentUser?.password;
    if (dataUser?.currentUser) dispatch(actions.updateUser(user));
    else await dispatch(actions.addUser(user));
    let b = {};
    b.products = [];
    data?.shoppingCart?.forEach((item) => {
      b.products.push({ productCode: item.id, amount: item.count });
    });
    dispatch(actions.addBasket(b));
    setBuy(true);
    setTimeout(() => history.push({ pathname: "/private-area", state: { isBuy: true } }), 2000);
    dispatch(actions.resetCart());
  }

  return (
    <>
      <div class="cart-wrapper">
        <div class="first-div">
          <h1>פרטי ההזמנה</h1>
          {data?.shoppingCart?.map((item, key) => (
            <div class="bag-product" key={key}>
              {" "}
              <img
                style={{ width: "80px", height: "80px" }}
                src={data?.products?.find((x) => x._id == item.id)?.img}
              ></img>
              <h3>
                {data?.products?.find((x) => x._id == item.id)?.productName}
              </h3>
              <h5>
                {" "}
                {data?.products?.find((x) => x._id == item.id)?.price} ש"ח
              </h5>
              <lable>
                <input
                  defaultValue={item.count}
                  type="number"
                  min="1"
                  max={data?.products?.find((x) => x._id == item.id)?.count}
                  onClick={(e) =>
                    dispatch(
                      actions.updateCart({ id: item.id, count: e.target.value })
                    )
                  }
                ></input>
              </lable>
            </div>
          ))}
          <div
            className="footer-wrapper"
            style={{ maxWidth: "400px", margin: "auto" }}
          >
            <h1 className="wrap-cnt "> {data?.shoppingCart.length} פריטים</h1>
            <h1 className="wrap-cnt "> {sum} ש"ח</h1>
          </div>
        </div>

        <div className="form-div">
          <form onSubmit={(e) => func(e)}>
            <h1>פרטים אישיים</h1>
            <input
              id="userName"
              defaultValue={dataUser?.currentUser?.userName}
              placeholder="שם"
            ></input>
            <input
              id="phone"
              type="tel"
              defaultValue={dataUser?.currentUser?.phone}
              placeholder="טלפון"
            ></input>
            <input
              id="email"
              type="email"
              defaultValue={dataUser?.currentUser?.email}
              placeholder="מייל"
            ></input>
            <input
              id="address"
              defaultValue={dataUser?.currentUser?.address}
              placeholder="כתובת"
            ></input>
            <input
              id="password"
              defaultValue={dataUser?.currentUser?.password}
              placeholder="סיסמה"
            ></input>
            <div>
              <p>הכנסת פרטי כרטיס אשראי</p>
            </div>
            <button class="btn-gold-small " type="submit">
              {" "}
              אישור ההזמנה
            </button>
          </form>
          {buy ? <h1>קנייתך בוצעה בהצלחה!!</h1> : null}{" "}
        </div>
        <div class="third-div summery">
          {" "}
          <h1>סיכום</h1>
          <b class="include_shipping">
            משלוח: <span class="dynamic_shipping">נא לבחור סוג משלוח</span>
          </b>
          <b>
            סה"כ לתשלום
            <span class="include_shipping_text">, לא כולל משלוח</span>:{" "}
            <span class="dynamic_payments">בחר כמות תשלומים</span>{" "}
            <span class="currency">₪</span>
          </b>
        </div>
      </div>
    </>
  );
}
