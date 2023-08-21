import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/womenMenPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeCategoryValue,
  handleChangeSortingValue,
  handleChangeSearchTerm,
  fetchData,
  handleSubmit,
} from "../redux/slices/womenSlice";
import { WomenPageContent } from "../components/WomenPageContent";
import { useEffect } from "react";

export const WomenPage = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => {
    return state.women.searchTerm;
  });

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="womenMenPage">
      <div className="womenMenPageUpper">
        <select
          name="categories"
          className="categories"
          defaultValue={"allWomen"}
          onChange={(event) => {
            dispatch(handleChangeCategoryValue(event.target.value));
          }}
        >
          <option className="categoryOptions" value="allWomen">
            All Women Products
          </option>
          <option className="categoryOptions" value="womenPants">
            Women Pants
          </option>
          <option className="categoryOptions" value="womenTshirts">
            Women T-Shirts
          </option>
          <option className="categoryOptions" value="womenJackets">
            Women Jackets
          </option>
        </select>

        <div style={{ position: "relative" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(handleSubmit());
            }}
          >
            <input
              type="text"
              placeholder="Search"
              className="searchInput"
              onChange={(event) => {
                dispatch(handleChangeSearchTerm(event.target.value));
              }}
              value={searchTerm}
            />
          </form>

          <SearchIcon className="searchIcon" />
        </div>

        <select
          name="sorting"
          className="sorting"
          defaultValue={"featured"}
          onChange={(event) => {
            dispatch(handleChangeSortingValue(event.target.value));
          }}
        >
          <option className="sortingOptions" value="featured">
            Sort By : Featured
          </option>
          <option className="sortingOptions" value="lowToHigh">
            Price : Low to High
          </option>
          <option className="sortingOptions" value="highToLow">
            Price : High to Low
          </option>
        </select>
      </div>

      <WomenPageContent />
    </div>
  );
};
