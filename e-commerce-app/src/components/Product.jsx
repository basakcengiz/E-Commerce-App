import React, { useState, useEffect } from "react";
import "../styles/product.css";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, handleFavs } from "../redux/slices/favsCartSlice";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar } from "@mui/material";

export const Product = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favsCart = useSelector((state) => state.favsCart);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [isFav, setIsFav] = useState(false);

  const handleIconClick = (product) => {
    dispatch(handleFavs(product));
    setIsFav((prevState) => !prevState);
  };

  const handleImgClick = () => {
    navigate(`${product.id}`);
  };

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

  const handleIsFav = () => {
    const isFavProduct = favsCart.favsItems.find((item) => {
      return item.id === product.id;
    });
    setIsFav(!!isFavProduct);
  };

  useEffect(() => {
    handleIsFav();
  });

  return (
    <div className="card">
      <div className="cardMedia">
        <img
          src={product.image}
          alt="Error"
          className="cardImage"
          onClick={handleImgClick}
        />

        {isFav ? (
          <FavoriteIcon
            className="cardIcon"
            onClick={() => {
              handleIconClick(product);
            }}
          />
        ) : (
          <FavoriteBorderIcon
            className="cardIcon"
            onClick={() => {
              handleIconClick(product);
            }}
          />
        )}
      </div>

      <div className="cardInfo">
        <h3>{product.title}</h3>
        <h3>{product.price}$</h3>
        <button
          className="cardButton"
          onClick={() => {
            handleBtnClick(product);
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
  );
};
