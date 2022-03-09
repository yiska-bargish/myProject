import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import GetUser from "../../service/service";
import { IconButton, Icon } from "@mui/material";
import i from "../../assets/img/14.jpg";
import { Link } from 'react-router-dom'

import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const categories = useSelector((state) => state.product.categories);

  const createCarouselItemImage = (index, options = {}) => (
    <div key={index}>
      <img src={img1} />
      {/* <p className="legend">Legend {index}</p> */}
    </div>
  );

  const baseChildren = (
    <div>{[1, 2, 3, 4, 5].map(createCarouselItemImage)}</div>
  );

  const getConfigurableProps = () => ({
    showArrows: false,
    showStatus: false,
    showIndicators: true,
    infiniteLoop: true,
    showThumbs: false,
    useKeyboardArrows: false,
    autoPlay: true,
    stopOnHover: false,
    swipeable: false,
    dynamicHeight: false,
    emulateTouch: false,
    autoFocus: false,
    thumbWidth: 90,
    selectedItem: 0,
    interval: 5000,
    transitionTime: 3000,
    swipeScrollTolerance: 5,
    ariaLabel: "",
  });

  return (
    <>
      {/* <img className="nisayon" src={image} ></img> */}
      <Carousel {...getConfigurableProps()}>
        <div key="1">
          <img src={img1} />
        </div>
        <div key="2">
          <img src={img2} />
        </div>
        <div key="3">
          <img src={img3} />
        </div>
        <div key="4">
          <img src={img4} />
        </div>
        <div key="5">
          <img src={img5} />
        </div>
      </Carousel>
      {/* <img className="nisayon" src={newimg}></img> */}
      <div style={{ backgroundImage: i, width: "500px" }}></div>
      <div className="home">
        <br />
        <br />
        {data?.product?.categories?.map((item, index) => (
          <div key={index} className="home2">
            <Link
              to={`/${item.categoryName}`}
              onClick={() => dispatch(actions.changeCategory(item._id))}
            >
              <img
                className="imgHome"
                src={
                  data?.product?.products?.find(
                    (x) => x.categoryCode == item._id
                  )?.img
                }
                style={{ width: "300px" }}
              ></img>
            </Link>
            <div className="cat-text-wrapper">
              <h3 className="home3 cat-text">{item.categoryName}</h3>
            </div>
          </div>
        ))}
      </div>
      <br />
     
    </>
  );
}
