import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Farmer } from '../types';

interface FarmerState {
  profile: Farmer | null;
}

const initialState: FarmerState = {
  profile: null,
};

const farmerSlice = createSlice({
  name: 'farmer',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Farmer>) => {
      state.profile = action.payload;
      localStorage.setItem('farmerProfile', JSON.stringify(action.payload));
    },
    loadProfile: (state) => {
      const saved = localStorage.getItem('farmerProfile');
      if (saved) {
        state.profile = JSON.parse(saved);
      }
    },
    clearProfile: (state) => {
      state.profile = null;
      localStorage.removeItem('farmerProfile');
    },
  },
});

export const { setProfile, loadProfile, clearProfile } = farmerSlice.actions;
export default farmerSlice.reducer;