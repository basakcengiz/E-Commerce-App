import React, { useEffect } from "react";
import "../styles/womenMenPage.css";
import { Product } from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeSortingValue } from "../redux/slices/menSlice";
import CircularProgress from "@mui/material/CircularProgress";

export const MenPageContent = () => {
  const dispatch = useDispatch();

  const men = useSelector((state) => state.men);

  useEffect(() => {
    dispatch(handleChangeSortingValue(men.sortingValue));
  }, [men.categoryValue]);

  return (
    <div className="womenMenPageContent">
      {men.loading ? (
        <div className="loading">
          <h2>LOADING...</h2>
          <CircularProgress />
        </div>
      ) : men.shownData.length === 0 ? (
        <div className="notFound">
          <h1>Oops!</h1>
          <p>We haven't found any results.</p>
        </div>
      ) : (
        men.shownData.map((product, index) => {
          return <Product product={product} key={index} />;
        })
      )}
    </div>
  );
};
