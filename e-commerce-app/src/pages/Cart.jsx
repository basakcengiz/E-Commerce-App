import React from "react";
import "../styles/cart.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
  clearCart,
  getTotals,
} from "../redux/slices/favsCartSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

export const Cart = () => {
  const favsCart = useSelector((state) => state.favsCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [favsCart]);

  return (
    <div className="cart">
      <h2 className="myCart">MY CART</h2>

      <br />
      {favsCart.cartItems.length === 0 ? (
        <div className="emptyCart">
          <p>Your cart is empty.</p>
          <br />
          <div className="startShopping">
            <ArrowBackIosIcon />
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "600",
              }}
            >
              Start Shopping!
            </Link>
          </div>
        </div>
      ) : (
        <div className="cartPage">
          {favsCart.cartItems &&
            favsCart.cartItems.map((item) => (
              <div className="cartProduct" key={item.id}>
                <div className="cartMedia">
                  <img src={item.image} className="cartImage" />
                  <div className="cartInfo">
                    <h3>{item.title}</h3>
                    <p
                      className="itemTitle"
                      style={{ fontSize: "25px", fontWeight: "100" }}
                    >
                      {item.price}$
                    </p>
                  </div>
                </div>

                <div className="cartQuantity">
                  <button
                    className="minusPlusButton"
                    onClick={() => {
                      dispatch(decreaseCart(item));
                    }}
                  >
                    -
                  </button>
                  <p style={{ fontSize: "25px" }}>{item.cartQuantity}</p>
                  <button
                    className="minusPlusButton"
                    onClick={() => {
                      dispatch(addToCart(item));
                    }}
                  >
                    +
                  </button>
                </div>

                <div className="cartTotal">
                  <p style={{ fontSize: "20px", fontWeight: " 600" }}>
                    Total: {item.price * item.cartQuantity}$
                  </p>
                </div>
                <div className="cartRemove">
                  <button
                    className="removeButton"
                    onClick={() => {
                      dispatch(removeFromCart(item));
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          <div className="cartSummary">
            <p style={{ fontSize: "30px", fontWeight: "600" }}>
              SUBTOTAL : {favsCart.cartTotalAmount}$
            </p>
            <div className="cartEnding">
              <button className="buyNow">Buy Now</button>
              <button
                className="clearCart"
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
