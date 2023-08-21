import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("fetchData", async () => {
  const response = await axios.get(`http://localhost:3000/womenProducts`);
  return response.data;
});

const womenSlice = createSlice({
  name: "women",
  initialState: {
    categoryValue: "allWomen",
    searchTerm: "",
    sortingValue: "featured",
    allWomenData: [],
    shownData: [],
    loading: "false",
  },
  reducers: {
    handleChangeCategoryValue(state, action) {
      state.categoryValue = action.payload;

      if (state.categoryValue === "allWomen") {
        state.shownData = [...state.allWomenData];
      } else {
        state.shownData = state.allWomenData.filter((product) => {
          return product.category === state.categoryValue;
        });
      }
    },
    handleChangeSortingValue(state, action) {
      state.sortingValue = action.payload;

      if (state.sortingValue === "lowToHigh") {
        state.shownData = state.shownData.sort((productA, productB) => {
          return productA.price - productB.price;
        });
      } else if (state.sortingValue === "highToLow") {
        state.shownData = state.shownData.sort((productA, productB) => {
          return productB.price - productA.price;
        });
      } else {
        if (state.categoryValue === "allWomen") {
          state.shownData = [...state.allWomenData];
        } else {
          state.shownData = state.allWomenData.filter((product) => {
            return product.category === state.categoryValue;
          });
        }
      }
    },
    handleChangeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    handleSubmit(state) {
      state.shownData = state.shownData.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(state.searchTerm.toLowerCase());
      });
      state.searchTerm = "";
    },

  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.allWomenData = action.payload;
      state.shownData = [...state.allWomenData];

      state.loading = false;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  handleChangeCategoryValue,
  handleChangeSortingValue,
  handleChangeSearchTerm,
  handleSubmit,
  handleFavIconWomen,
} = womenSlice.actions;

export const womenReducer = womenSlice.reducer;
