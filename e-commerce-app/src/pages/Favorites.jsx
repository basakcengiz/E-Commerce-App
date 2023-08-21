import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/favorites.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

import { addToCart, handleFavs } from "../redux/slices/favsCartSlice";

export const Favorites = () => {
  const favsCart = useSelector((state) => state.favsCart);

  const dispatch = useDispatch();

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleBtnClick = (product) => {
    dispatch(addToCart(product));
    setOpenSnackBar(true);
  };

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton onClick={handleClose}>
        <CloseIcon
          sx={{ color: "white" }}
          style={{ backgroundColor: "none" }}
        />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="favs">
      <h2 className="myFavs">MY FAVORITES</h2>
      <br />
      {favsCart.favsItems.length === 0 ? (
        <div className="noFavs">
          <p> No favorites found. </p>
          <br />
          <div className="continueShopping">
            <ArrowBackIosIcon />
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "600",
              }}
            >
              Continue Shopping!
            </Link>
          </div>
        </div>
      ) : (
        <div className="favsPage">
          {favsCart.favsItems.map((item) => (
            <div key={item.id}>
              <div className="card">
                <div className="cardMedia">
                  <button
                    className="removeFav"
                    onClick={() => {
                      dispatch(handleFavs(item));
                    }}
                  >
                    X
                  </button>
                  <img src={item.image} alt="Error" className="cardImage" />
                </div>

                <div className="cardInfo">
                  <h3>{item.title}</h3>
                  <h3>{item.price}$</h3>
                  <button
                    className="cardButton"
                    onClick={() => {
                      handleBtnClick(item);
                    }}
                  >
                    Add to Cart
                  </button>
                  <Snackbar
                    open={openSnackBar}
                    message="Added to cart."
                    action={action}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
