import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Modal,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import action from "../../redux/actions";
import "./nav.css";
import Buy from "../buy";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import title from "./title.png";

export default function NavFunc() {

  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  const dataUser = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    await dispatch(action.getAllCategories());
    await dispatch(action.getAllProducts());
  }, []);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  function goToPay() {
    closeModal();
    history.push("/cart");
  }

  function func(e) {
    e.preventDefault();
    let u = dataUser?.currentUser;
    u.isNewsLetter = true;
    dispatch(action.updateUser(u));
  }

  return (
    <>
      <Navbar className="navBar-container" expand="lg">
        <Container>
          <div className="shopWrap" onClick={openModal}>
            <img src="https://d3m9l0v76dty0.cloudfront.net/layout3/stores/woodstock/cart.png" />
            <p> {data?.shoppingCart.length} </p>
          </div>  {showModal && (
            <Modal.Dialog>
              {/* <Modal.Header closeButton>
                    <Modal.Title>סגור</Modal.Title>
                </Modal.Header> */}
              <Modal.Body>
                <Buy />
              </Modal.Body>
              <Modal.Footer className="footer-wrapper">
                <button
                  class="btn-black" variant="secondary" onClick={closeModal}>
                  ביטול
              </button>
                <button class="btn-gold" onClick={() => goToPay()}>
                  לתשלום
              </button>
              </Modal.Footer>
            </Modal.Dialog>
          )}
          <LogoutIcon
            onClick={() => {
              dispatch(action.logout());
              history.push("/home");
            }}
          ></LogoutIcon>
          <Navbar.Brand className="harmonia-logo">
            {/* <h2 className='title'>הרמוניה לבית</h2> */}
            <img className="title" src={title}></img>
          </Navbar.Brand>
          {
            <div className="topRight">
              <Link className="link" to="/home">
                <p>דף הבית |</p>
              </Link>
              {!dataUser.currentUser ? (
                <>
                  <Link className="link" to="/Sign-in">
                    <p>התחברות |</p>
                  </Link>
                  <Link className="link" to="/Sign-up">
                    <p>הרשמה |</p>
                  </Link>
                </>
              ) : null}
              <Link className="link" to="/about">
                <p>אודות |</p>
              </Link>
              <Link className="link" to="/branch">
                <p>סניפים </p>
              </Link>
              {dataUser.isAdmin ? (
                <Link className="link" to="/updates">
                  <p> | עדכונים </p>
                </Link>
              ) : null}
            </div>
          }
          {
            <div className="right4">
              {data.categories?.slice(0, 4).map((item, key) => (
                <Link
                  className="link"
                  key={key}
                  to={`/${item.categoryName}`}
                  onClick={() => dispatch(action.changeCategory(item._id))}
                >
                  <p>{item.categoryName}</p>{" "}
                </Link>
              ))}{" "}
            </div>
          }
          {
            <div className="left4">
              {data.categories?.slice(4, 8).map((item, key) => (
                <Link
                  className="link"
                  key={key}
                  to={`/${item.categoryName}`}
                  onClick={() => dispatch(action.changeCategory(item._id))}
                >
                  <p>{item.categoryName}</p>{" "}
                </Link>
              ))}{" "}
            </div>
          }
        </Container>


      </Navbar>
      {/* <div>
        <form onSubmit={(e)=>func(e)}>
            <input type='email' placeholder='הכנס מייל'></input>
            <button type='submit' ></button>
          </form>
        </div> */}
    </>
  );
}
