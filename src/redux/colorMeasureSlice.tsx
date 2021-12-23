import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ColorMeasure, ColorResult } from "../models/ColorMeasure";
import { removeItemAll } from "./helpers";

// Define a type for the slice state
interface ColorMeasureState {
    value: ColorMeasure | null;
    measureLoading: boolean;
    inputLoading: boolean;
    refLoading: boolean;
    resultLoading: boolean;
    errMsg: string;
}

// Define the initial state using that type
const initialState: ColorMeasureState = {
    value: null,
    measureLoading: false,
    inputLoading: false,
    refLoading: false,
    resultLoading: false,
    errMsg: "",
};

export const colorMeasureSlice = createSlice({
    name: "colorMeasure",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        fetchColorMeasureStart: (state) => {
            state.measureLoading = true;
        },
        fetchColorMeasureSuccess: (state, action: PayloadAction<ColorMeasure>) => {
            state.value = action.payload;
            state.measureLoading = false;
        },
        cleanColorMeasureSuccess: (state) => {
            state.value = null;
            state.measureLoading = false;
        },
        handleColorInputImgsStart: (state) => {
            state.inputLoading = true;
        },
        fetchColorInputImgsSuccess: (state, action: PayloadAction<string[]>) => {
            if (state.value != null) {
                state.value.input_imgs = action.payload;
            }
            state.inputLoading = false;
        },
        handleColorRefImgStart: (state) => {
            state.refLoading = true;
        },
        fetchColorRefImgsSuccess: (state, action: PayloadAction<string[]>) => {
            if (state.value != null) {
                state.value.ref_imgs = action.payload;
            }
            state.refLoading = false;
        },
        uploadColorInputImgSuccess: (state, action: PayloadAction<string>) => {
            state.value?.input_imgs.push(action.payload);
            state.inputLoading = false;
        },
        uploadColorRefImgSuccess: (state, action: PayloadAction<string>) => {
            state.value?.ref_imgs.push(action.payload);
            state.refLoading = false;
        },
        removeColorInputImgSuccess: (state, action: PayloadAction<string>) => {
            if (state.value != null) {
                state.value.input_imgs = removeItemAll(state.value.input_imgs, action.payload);
            }
            state.inputLoading = false;
        },
        removeColorRefImgSuccess: (state, action: PayloadAction<string>) => {
            if (state.value != null) {
                state.value.ref_imgs = removeItemAll(state.value.ref_imgs, action.payload);
            }
            state.refLoading = false;
        },
        fetchColorResultStart: (state) => {
            state.resultLoading = true;
        },
        fetchColorResultSuccess: (state, action: PayloadAction<ColorResult>) => {
            if (state.value != null) {
                state.value.color_result = action.payload;
            }
            state.resultLoading = false;
        },
        handleColorMeasError: (state, action: PayloadAction<string>) => {
            state.inputLoading = false;
            state.refLoading = false;
            state.resultLoading = false;
            state.errMsg = action.payload;
        },
        initColorMeas: (state) => {
            state.value = null;
            state.measureLoading = false;
            state.inputLoading = false;
            state.refLoading = false;
            state.resultLoading = false;
            state.errMsg = "";
        },
    },
});

export const {
    fetchColorMeasureStart,
    fetchColorMeasureSuccess,
    cleanColorMeasureSuccess,
    handleColorInputImgsStart,
    fetchColorInputImgsSuccess,
    handleColorRefImgStart,
    fetchColorRefImgsSuccess,
    uploadColorInputImgSuccess,
    uploadColorRefImgSuccess,
    removeColorInputImgSuccess,
    removeColorRefImgSuccess,
    fetchColorResultStart,
    fetchColorResultSuccess,
    handleColorMeasError,
    initColorMeas,
} = colorMeasureSlice.actions;

export const selectColorMeasure = (state: RootState) => state.colorMeasure.value;

export default colorMeasureSlice.reducer;
