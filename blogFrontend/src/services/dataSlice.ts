import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialData {
  postData: { title: string; content: string; id: string };
}
const initialState: initialData = {
  postData: { title: "", content: "", id: "" },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPostData(
      state,
      action: PayloadAction<{ title: string; content: string; id: string }>
    ) {
      state.postData = action.payload;
    },
  },
});
export const { setPostData } = dataSlice.actions;
export default dataSlice.reducer;
