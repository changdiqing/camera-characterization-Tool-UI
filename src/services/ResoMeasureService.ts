/*
    Services for CRUD operations on resolution measurements
*/
import axios from "axios";
import { ResoMeasure, ResoResult } from "../models/ResoMeasure";
import { store } from "../redux/store";
import {
    handleResoMeasureStart,
    fetchResoMeasureSuccess,
    uploadResoInputImgSuccess,
    fetchResoResultSuccess,
    handleResoMeasureError,
    removeResoInputImgSuccess,
} from "../redux/resoMeasureSlice";
import { message } from "antd";

export function fetchResoMeasure(dut_id: string) {
    store.dispatch(handleResoMeasureStart());
    axios
        .get("http://127.0.0.1:5000/reso", { params: { dut_id: dut_id } })
        .then((resp) => {
            let resoMeas: ResoMeasure = resp.data.reso_meas;
            store.dispatch(fetchResoMeasureSuccess(resoMeas));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleResoMeasureError(errMsg));
        });
}

export function executeResoMeasure(dut_id: string) {
    store.dispatch(handleResoMeasureStart());
    axios
        .get("http://127.0.0.1:5000/reso_exec", { params: { dut_id: dut_id } })
        .then((resp) => {
            let resoResult: ResoResult = resp.data.reso_result;
            store.dispatch(fetchResoResultSuccess(resoResult));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleResoMeasureError(errMsg));
        });
}

export function uploadResoInputImg(dut_id: string, file: File) {
    store.dispatch(handleResoMeasureStart());
    const data = new FormData();
    data.append("dut_id", dut_id);
    data.append("file", file);
    axios
        .post("http://127.0.0.1:5000/reso_input_img", data)
        .then((resp) => {
            let data = resp.data;
            let imageUrl = data.image_url;
            store.dispatch(uploadResoInputImgSuccess(imageUrl));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleResoMeasureError(errMsg));
        });
}

export function removeResoInputImg(dutId: string, imgUrl: string) {
    store.dispatch(handleResoMeasureStart());
    let data = { dut_id: dutId, img_url: imgUrl };
    axios
        .delete("http://127.0.0.1:5000/reso_input_img", { data: data })
        .then((resp) => {
            let data = resp.data;
            let imageUrl = data.image_url;
            store.dispatch(removeResoInputImgSuccess(imageUrl));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleResoMeasureError(errMsg));
        });
}
