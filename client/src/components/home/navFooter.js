import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import "./nav.css";
import { useHistory } from "react-router-dom";
export default function NavFooterFunc() {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  const dataUser = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    await dispatch(actions.getAllCategories());
    await dispatch(actions.getAllProducts());
  }, []);

  const categories = useSelector((state) => state.product.categories);


  return (
    <>
    <footer className="navBar-container2">
        <div>
          <h3>קטגוריות ראשיות</h3>
          <hr></hr>
          {categories.map((item, key) => {
            return (
              <Link
                className="link-bottom "
                key={key}
                to={`/${item.categoryName}`}
                onClick={() => dispatch(actions.changeCategory(item._id))}
              >
                <p>{item.categoryName}</p>{" "}
              </Link>
            );
          })}
        </div>
        <div>
          <h3>דברו איתנו</h3>
          <hr></hr>
          <p>טלפון : 03-7505497</p>
          <p>פקס : 03-7748439</p>
          <p>שעות פעילות משרדי החברה : ימים א' – ה': 16:00 - 9:00</p>
          <br />
          <p>מייל לפניות לקוחות : cs@hr-l.co.il</p>
        </div>
      </footer>
      {/* <div>
        <form onSubmit={(e)=>func(e)}>
            <input type='email' placeholder='הכנס מייל'></input>
            <button type='submit' ></button>
          </form>
        </div> */}
    </>
  );
}
