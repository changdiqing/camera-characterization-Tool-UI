import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { DistMeasure, DistResult } from "../models/DistMeasure";
import { removeItemAll } from "./helpers";

// Define a type for the slice state
interface DistMeasureState {
    value: DistMeasure | null;
    measureLoading: boolean;
    inputLoading: boolean;
    resultLoading: boolean;
    errMsg: string;
}

// Define the initial state using that type
const initialState: DistMeasureState = {
    value: null,
    measureLoading: false,
    inputLoading: false,
    resultLoading: false,
    errMsg: "",
};

export const distMeasureSlice = createSlice({
    name: "distMeasure",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        fetchDistMeasureStart: (state) => {
            state.measureLoading = true;
        },
        fetchDistMeasureSuccess: (state, action: PayloadAction<DistMeasure>) => {
            state.value = action.payload;
            state.inputLoading = false;
        },
        handleDistMeasureError: (state, action: PayloadAction<string>) => {
            state.errMsg = action.payload;
            state.measureLoading = false;
            state.inputLoading = false;
            state.resultLoading = false;
        },
        cleanDistMeasureSuccess: (state) => {
            state.value = null;
            state.measureLoading = false;
            state.inputLoading = false;
            state.resultLoading = false;
        },
        fetchDistInputImgsStart: (state) => {
            state.inputLoading = true;
        },
        fetchDistInputImgsSuccess: (state, action: PayloadAction<string[]>) => {
            if (state.value != null) {
                state.value.input_imgs = action.payload;
            }
            state.inputLoading = false;
        },
        uploadDistImgsStart: (state) => {
            state.inputLoading = true;
        },
        uploadDistImgSuccess: (state, action: PayloadAction<string>) => {
            state.value?.input_imgs.push(action.payload);
            state.inputLoading = false;
        },
        removeDistImgsStart: (state) => {
            state.inputLoading = true;
        },
        removeDistImgSuccess: (state, action: PayloadAction<string>) => {
            if (state.value != null) {
                state.value.input_imgs = removeItemAll(state.value.input_imgs, action.payload);
            }
            state.inputLoading = false;
        },
        fetchDistResultStart: (state) => {
            state.resultLoading = true;
        },
        fetchDistResultSuccess: (state, action: PayloadAction<DistResult>) => {
            if (state.value != null) {
                state.value.dist_result = action.payload;
            }
            state.resultLoading = false;
        },
        initDistMeas: (state) => {
            state.value = null;
            state.measureLoading = false;
            state.inputLoading = false;
            state.resultLoading = false;
            state.errMsg = "";
        },
    },
});

export const {
    fetchDistMeasureStart,
    fetchDistMeasureSuccess,
    cleanDistMeasureSuccess,
    fetchDistInputImgsStart,
    fetchDistInputImgsSuccess,
    uploadDistImgsStart,
    uploadDistImgSuccess,
    removeDistImgsStart,
    removeDistImgSuccess,
    fetchDistResultStart,
    fetchDistResultSuccess,
    handleDistMeasureError,
    initDistMeas,
} = distMeasureSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDistMeasure = (state: RootState) => state.distMeasure.value;

export default distMeasureSlice.reducer;
