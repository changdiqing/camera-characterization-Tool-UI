import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import Device from "../models/Device";

// Define a type for the slice state
interface DeviceListState {
    value: Device[];
    loading: boolean;
    errMsg: string;
}

// Define the initial state using that type
const initialState: DeviceListState = {
    value: [],
    loading: false,
    errMsg: "",
};

export const deviceListSlice = createSlice({
    name: "deviceList",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        fetchDeviceStart: (state) => {
            state.loading = true;
        },
        fetchDeviceSuccess: (state, action: PayloadAction<Device[]>) => {
            state.value = action.payload;
            state.loading = false;
        },
        fetchDeviceError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.errMsg = action.payload;
        },
        addDeviceStart: (state) => {
            state.loading = true;
        },
        addDeviceSuccess: (state, action: PayloadAction<Device>) => {
            state.value.push(action.payload);
            state.loading = false;
        },
        addDeviceError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.errMsg = action.payload;
        },
        removeDeviceStart: (state) => {
            state.loading = true;
        },
        removeDeviceSuccess: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter((obj) => obj._id != action.payload);
            state.loading = false;
        },
        removeDeviceError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.errMsg = action.payload;
        },
    },
});

export const {
    fetchDeviceStart,
    fetchDeviceSuccess,
    fetchDeviceError,
    addDeviceStart,
    addDeviceSuccess,
    addDeviceError,
    removeDeviceStart,
    removeDeviceSuccess,
    removeDeviceError,
} = deviceListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDeviceList = (state: RootState) => state.deviceList.value;

export default deviceListSlice.reducer;
