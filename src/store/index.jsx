import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialThemeState = {
  isDarkTheme: false,
  showPremiumBtn: true,
};

// Create a theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,

  reducers: {
    toggleTheme(state, action) {
      state.isDarkTheme = !state.isDarkTheme;
    },
    showPremiumBtn(state) {
      state.showPremiumBtn = !state.showPremiumBtn;
    },
  },
});
const initialState = {
  data: [],
  dataForEdit: {},
  token: "",
  totalAmount: 0,
  isPremium: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData(state, action) {
      console.log(action.payload);
      const newData = action.payload;
      state.data.push(newData);
      state.isEdit = false;
      state.dataForEdit = {};
      state.totalAmount += Number(newData.amount);
    },
    deleteData(state, action) {
      const deletedItem = action.payload;
      console.log("amount is ", deletedItem.amount);
      state.totalAmount -= Number(deletedItem.amount);
      state.data = state.data.filter((exp) => exp.id !== deletedItem.id);
    },
    editData(state, action) {
      state.dataForEdit = { ...action.payload };
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    getData(state, action) {
      console.log(action.payload);
      state.data = action.payload;
      state.totalAmount = state.data.reduce(
        (total, item) => total + item.amount,
        0
      );
    },
    isPremiumFn(state) {
      state.isPremium = !state.isPremium;
    },
  },
});

console.log(initialState);
export const { addData, deleteData, editData, setToken, getData, isPremiumFn } =
  dataSlice.actions;
//const store = configureStore({ reducer: dataSlice.reducer });

export const { toggleTheme, showPremiumBtn } = themeSlice.actions;
const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    theme: themeSlice.reducer,
    // Add your new reducer here
    // For example:
    // newReducer: newReducerSlice.reducer,
  },
});
export default store;
