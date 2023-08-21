import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("fetchData", async () => {
  const response = await axios.get(`http://localhost:3000/menProducts`);
  return response.data;
});

const menSlice = createSlice({
  name: "men",
  initialState: {
    categoryValue: "allMen",
    searchTerm: "",
    sortingValue: "featured",
    allMenData: [],
    shownData: [],
    loading: "false",
  },
  reducers: {
    handleChangeCategoryValue(state, action) {
      state.categoryValue = action.payload;
      if (state.categoryValue === "allMen") {
        state.shownData = [...state.allMenData];
      } else {
        state.shownData = state.allMenData.filter((product) => {
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
        if (state.categoryValue === "allMen") {
          state.shownData = [...state.allMenData];
        } else {
          state.shownData = state.allMenData.filter((product) => {
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
      state.allMenData = action.payload;
      state.shownData = [...state.allMenData];
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
  handleFavIconMen,
} = menSlice.actions;

export const menReducer = menSlice.reducer;
