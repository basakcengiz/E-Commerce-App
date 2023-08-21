import React, { useEffect, useState } from "react";
import "../styles/womenMenPage.css";
import { Product } from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeSortingValue } from "../redux/slices/womenSlice";
import CircularProgress from "@mui/material/CircularProgress";

export const WomenPageContent = () => {
  const dispatch = useDispatch();

  const women = useSelector((state) => state.women);

  useEffect(() => {
    dispatch(handleChangeSortingValue(women.sortingValue));
  }, [women.categoryValue]);

  return (
    <div className="womenMenPageContent">
      {women.loading ? (
        <div className="loading">
          <h2>LOADING...</h2>
          <CircularProgress />
        </div>
      ) : women.shownData.length === 0 ? (
        <div className="notFound">
          <h1>Oops!</h1>
          <p>We haven't found any results.</p>
        </div>
      ) : (
        women.shownData.map((product, index) => {
          return <Product product={product} key={index} />;
        })
      )}
    </div>
  );
};
