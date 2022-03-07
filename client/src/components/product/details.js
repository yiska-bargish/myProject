import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../redux/actions";

export default function Details() {
  const history = useHistory();
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [add, setAdd] = useState();

  function addFunc() {
    dispatch(actions.addToCart(id));
    setAdd(true);
    setTimeout(
      () =>
        history.push(
          `/${
            data?.product?.categories?.find(
              (x) => x._id == data?.product?.category
            )?.categoryName
          }`
        ),
      2000
    );
  }

  if (!id) history.push("/");

  return (
    <>
      <div className="wrapper-details">
        <div className="rightSide">
          <div className="img-wrapper">
            <img
              src={data?.product?.products?.find((x) => x._id == id)?.img}
            ></img>
          </div>{" "}
        </div>
        <div class="leftSide">
          <h3>
            {" "}
            {data?.product?.products?.find((x) => x._id == id)?.productName}
          </h3>
          <h6>
            {" "}
            {data?.product?.products?.find((x) => x._id == id)?.description}
          </h6>
          <hr></hr>  <h5>ש"ח</h5> <h5>
           
            {data?.product?.products?.find((x) => x._id == id)?.price}{" "}
          </h5> {" "}
         
        {" "}
          <hr></hr>
          {/* {data?.product?.products?.find(x => x._id == id)?.description} */}
          <div className="background-wrapper">
            {data?.product?.products
              ?.find((x) => x._id == id)
              ?.colors?.map((item) => (
                <div
                  style={{
                    backgroundColor: item.color,
                    width: "20px",
                    height: "20px",
                  }}
                ></div>
              ))}
          </div>
          <div className="footer-wrapper">
            <button class="btn-gold" onClick={() => addFunc()}>
              הוסף לסל
            </button>
            <button
              class="btn-black"
              onClick={() =>
                history.push(
                  `/${
                    data?.product?.categories?.find(
                      (x) => x._id == data?.product?.category
                    )?.categoryName
                  }`
                )
              }
            >
              הקודם
            </button>
          </div><br></br>
          {add ? <h4 >!!!המוצר נוסף לסל בהצלחה</h4> : null}
        </div>
      </div>
    </>
  );
}
