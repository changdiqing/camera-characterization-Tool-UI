/*
    Services for CRUD operations on DUTs (Devices Under Test)
*/
import axios from "axios";
import Device from "../models/Device";
import { store } from "../redux/store";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
    fetchDeviceStart,
    fetchDeviceSuccess,
    fetchDeviceError,
    addDeviceStart,
    addDeviceSuccess,
    addDeviceError,
    removeDeviceStart,
    removeDeviceSuccess,
    removeDeviceError,
} from "../redux/deviceListSlice";
import { initColorMeas, selectColorMeasure } from "../redux/colorMeasureSlice";
import { initDistMeas, selectDistMeasure } from "../redux/distMeasureSlice";
import { initResoMeas, selectResoMeasure } from "../redux/resoMeasureSlice";
import { message } from "antd";

export function addDevice(device: Device) {
    store.dispatch(addDeviceStart());
    axios
        .post("http://127.0.0.1:5000/duts", { dut: device })
        .then((resp) => {
            let dut = resp.data.dut;
            store.dispatch(addDeviceSuccess(dut));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(addDeviceError(errMsg));
        });
}
export function fetchDevice() {
    store.dispatch(fetchDeviceStart());
    axios
        .get("http://127.0.0.1:5000/duts")
        .then((resp) => {
            let duts: Device[] = <Device[]>resp.data;
            store.dispatch(fetchDeviceSuccess(duts));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(fetchDeviceError(errMsg));
        });
}

export function removeDevice(dut_id: string) {
    store.dispatch(removeDeviceStart());
    axios
        .delete("http://127.0.0.1:5000/duts", { data: { dut_id: dut_id } })
        .then(() => {
            store.dispatch(removeDeviceSuccess(dut_id));
            clearMeas(dut_id);
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(removeDeviceError(errMsg));
        });
}

function clearMeas(dut_id: string) {
    let state = store.getState();
    if (selectColorMeasure(state)?.dut_id == dut_id) {
        store.dispatch(initColorMeas());
    }
    if (selectDistMeasure(state)?.dut_id == dut_id) {
        store.dispatch(initDistMeas());
    }
    if (selectResoMeasure(state)?.dut_id == dut_id) {
        store.dispatch(initResoMeas());
    }
}
