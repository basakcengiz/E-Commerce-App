import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";

export const Header = () => {
  const navigate = useNavigate();
  const favsCart = useSelector((state) => state.favsCart);

  return (
    <div className="header">
      <h2 className="headerTitle" onClick={() => navigate("/")}>
        SHOPOHOLIC
      </h2>
      <div className="headerDiv2">
       
        <div className="headerDiv3">
          <Badge
            badgeContent={favsCart.favsTotalQuantity}
            color="secondary"
            max={9}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <FavoriteBorderIcon />

            <Link to="/favorites" className="headerLink">
              Favorites
            </Link>
          </Badge>
        </div>
        <div className="headerDiv3">
          <Badge
            badgeContent={favsCart.cartTotalQuantity}
            color="secondary"
            max={9}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <ShoppingCartOutlinedIcon />
            <Link to="/cart" className="headerLink">
              Cart
            </Link>
          </Badge>
        </div>
      </div>
    </div>
  );
};
