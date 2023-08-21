import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/productInfoPage.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar } from "@mui/material";
import { handleFavs, addToCart } from "../redux/slices/favsCartSlice";

export const ProductInfoPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [productInfo, setProductInfo] = useState([]);

  const [openSnackBar, setOpenSnackBar] = useState(false);

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

  const shownDataWomen = useSelector((state) => {
    return state.women.shownData;
  });

  const shownDataMen = useSelector((state) => {
    return state.men.shownData;
  });

  const favsCart = useSelector((state) => state.favsCart);

  const [isFav, setIsFav] = useState(false);

  const productData = () => {
    if (id.includes("w")) {
      const productInfo = shownDataWomen.find((product) => {
        return product.id === id;
      });
      setProductInfo(productInfo);
    } else {
      const productInfo = shownDataMen.find((product) => {
        return product.id === id;
      });
      setProductInfo(productInfo);
    }
  };

  const handleIsFav = () => {
    const isFavProduct = favsCart.favsItems.find((item) => {
      return item.id === id;
    });
    setIsFav(!!isFavProduct);
  };

  useEffect(() => {
    productData();
    handleIsFav();
  });

  const handleIconClick = (productInfo) => {
    dispatch(handleFavs(productInfo));
    setIsFav((prevState) => !prevState);
  };

  return (
    <div className="productPage">
      <div className="productMedia">
        <img className="productImg" src={productInfo.image} />

        {isFav ? (
          <FavoriteIcon
            className="cardIcon"
            onClick={() => {
              handleIconClick(productInfo);
            }}
          />
        ) : (
          <FavoriteBorderIcon
            className="cardIcon"
            onClick={() => {
              handleIconClick(productInfo);
            }}
          />
        )}
      </div>
      <div className="productInfo">
        <h2 className="productTitle">{productInfo.title}</h2>
        <p className="productDescription">{productInfo.description}</p>
        <p className="productColor">Color : {productInfo.color}</p>
        <p className="productID">Product ID : {productInfo.id}</p>
        <p className="productPrice">{productInfo.price}$</p>
        <button
          className="cardButton"
          onClick={() => {
            dispatch(addToCart(productInfo));
            setOpenSnackBar(true);
          }}
        >
          Add to Cart
        </button>
      </div>
      <Snackbar
        open={openSnackBar}
        message="Added to cart."
        action={action}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </div>
  );
};
