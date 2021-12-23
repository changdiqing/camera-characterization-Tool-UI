import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ResoMeasure, ResoResult } from "../models/ResoMeasure";
import { removeItemAll } from "./helpers";

// Define a type for the slice state
interface ResoMeasureState {
    value: ResoMeasure | null;
    loading: boolean;
    errMsg: string;
}

// Define the initial state using that type
const initialState: ResoMeasureState = {
    value: null,
    loading: false,
    errMsg: "",
};

export const resoMeasureSlice = createSlice({
    name: "resoMeasure",
    initialState,
    reducers: {
        handleResoMeasureStart: (state) => {
            state.loading = true;
        },
        fetchResoMeasureSuccess: (state, action: PayloadAction<ResoMeasure>) => {
            state.value = action.payload;
            state.loading = false;
        },
        cleanResoMeasureSuccess: (state) => {
            state.value = null;
            state.loading = false;
        },
        fetchResoInputImgsSuccess: (state, action: PayloadAction<string[]>) => {
            if (state.value != null) {
                state.value.input_imgs = action.payload;
            }
            state.loading = false;
        },
        uploadResoInputImgSuccess: (state, action: PayloadAction<string>) => {
            state.value?.input_imgs.push(action.payload);
            state.loading = false;
        },
        removeResoInputImgSuccess: (state, action: PayloadAction<string>) => {
            if (state.value != null) {
                state.value.input_imgs = removeItemAll(state.value.input_imgs, action.payload);
            }
            state.loading = false;
        },
        fetchResoResultSuccess: (state, action: PayloadAction<ResoResult>) => {
            if (state.value != null) {
                state.value.reso_result = action.payload;
            }
            state.loading = false;
        },
        handleResoMeasureError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.errMsg = action.payload;
        },
        initResoMeas: (state) => {
            state.value = null;
            state.loading = false;
            state.errMsg = "";
        },
    },
});

export const {
    handleResoMeasureStart,
    fetchResoMeasureSuccess,
    cleanResoMeasureSuccess,
    fetchResoInputImgsSuccess,
    uploadResoInputImgSuccess,
    removeResoInputImgSuccess,
    fetchResoResultSuccess,
    handleResoMeasureError,
    initResoMeas,
} = resoMeasureSlice.actions;

export const selectResoMeasure = (state: RootState) => state.resoMeasure.value;

export default resoMeasureSlice.reducer;
