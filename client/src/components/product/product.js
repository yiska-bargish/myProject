import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import { useParams, useHistory } from "react-router-dom";
import { IconButton } from "@mui/material";
import { AddShoppingCartIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Products() {

  const history = useHistory()
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  const dataUser = useSelector((state) => state.user);
  //  const {category} = useParams()

  return (
    <div className="casing">
      <>
        {data.products
          ?.filter((x) => x.categoryCode == data?.category)
          .map((item, key) => (
            <div className="product">
              <Link to={`details/${item._id}`}>
                <div key={key}>
                  <div className="img_wrapper">
                    <img src={item.img} style={{ width: "200px" }}></img>{" "}
                  </div>
                  <div className="content">
                    <h3>{item.productName}</h3>
                    <h6>{item.description}</h6>
                    <hr></hr>
                    <h5> {item.price} ש"ח </h5>
                  </div>

                  {
                    <div className="colors-wrapper">
                      {item.colors?.map((item) => (
                        <div
                          key={item._id}
                          style={{
                            backgroundColor: item.color,
                            width: "20px",
                            height: "20px",
                          }}
                        ></div>
                      ))}
                    </div>
                  }
                </div>
              </Link>

             {dataUser?.currentUser?.password == dataUser?.adminAuth ? ( 
              <>
                <div className="footer-wrapper">
                  <div className="svg-wrapper">
                    <FontAwesomeIcon
                      icon={["fas", "ban"]}
                      onClick={() => dispatch(actions.deleteProduct(item._id))}
                    />
                  </div>
                  <div className="svg-wrapper">
                    <FontAwesomeIcon
                      icon={["fas", "pen"]}
                      onClick={() => dispatch(actions.deleteProduct(item._id))}
                    />
                  </div>

             
                </div>{" "}
              </>
               ) : null}
>>>>>>> 57a60c933c1917501c8accc63f1a0d11a083ed4d
            </div>
          ))}
      </>
    </div>
  );
}
