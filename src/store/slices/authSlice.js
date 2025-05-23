import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialStates = {
  teirId: localStorage.getItem('teirId') || null,
  isCrystalSelected: localStorage.getItem('crystalised') || false,
  email: "",
  openTerms: false,
  openPrivacy: false,
  selectedCrystalCoinType: JSON.parse(localStorage.getItem('selectedCrystalCoinType') || "null"), // Expecting { name, subTeirId }
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialStates,
  reducers: {
    // Actions
    setTeirId: (state, action) => {
      state.teirId = action.payload;
      localStorage.setItem('teirId', action.payload);
    },
    setIsCrystalSelected: (state, action) => {
      state.isCrystalSelected = action.payload;
      localStorage.setItem('crystalised', action.payload);
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setOpenTerms: (state, action) => {
      state.openTerms = action.payload;
    },
    setOpenPrivacy: (state, action) => {
      state.openPrivacy = action.payload;
    },
    setSelectedCrystalCoinType: (state, action) => {
      const { name, subTeirId, image } = action.payload;
      const data = { name, subTeirId, image };
      state.selectedCrystalCoinType = data;
      localStorage.setItem('selectedCrystalCoinType', JSON.stringify(data));
    },
  },
});

export const { setTeirId, setIsCrystalSelected, setEmail, setOpenTerms, setOpenPrivacy, setSelectedCrystalCoinType } =
  globalSlice.actions;
export default globalSlice.reducer;
