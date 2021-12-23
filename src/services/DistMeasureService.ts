/*
    Services for CRUD operations on distortino measurements
*/
import axios from "axios";
import { DistMeasure, DistResult } from "../models/DistMeasure";
import { store } from "../redux/store";
import {
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
} from "../redux/distMeasureSlice";
import { message } from "antd";

export function fetchDistMeasure(dut_id: string) {
    store.dispatch(fetchDistMeasureStart());
    axios
        .get("http://127.0.0.1:5000/dist", { params: { dut_id: dut_id } })
        .then((resp) => {
            store.dispatch(fetchDistMeasureSuccess(resp.data));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleDistMeasureError(errMsg));
        });
}

export function executeDistMeasure(dut_id: string) {
    store.dispatch(fetchDistResultStart());
    axios
        .get("http://127.0.0.1:5000/dist_exec", { params: { dut_id: dut_id } })
        .then((resp) => {
            let distResult: DistResult = resp.data.dist_result;
            store.dispatch(fetchDistResultSuccess(distResult));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleDistMeasureError(errMsg));
        });
}

export function uploadDistInputImg(dut_id: string, file: File) {
    const data = new FormData();
    data.append("dut_id", dut_id);
    data.append("file", file);
    store.dispatch(uploadDistImgsStart());
    axios
        .post("http://127.0.0.1:5000/dist_img", data)
        .then((resp) => {
            let data = resp.data;
            let imageUrl = data.image_url;
            store.dispatch(uploadDistImgSuccess(imageUrl));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleDistMeasureError(errMsg));
        });
}

export function removeDistInputImg(dutId: string, imgUrl: string) {
    let data = { dut_id: dutId, img_url: imgUrl };
    store.dispatch(removeDistImgsStart());
    axios
        .delete("http://127.0.0.1:5000/dist_img", { data: data })
        .then((resp) => {
            let data = resp.data;
            let imageUrl = data.image_url;
            store.dispatch(removeDistImgSuccess(imageUrl));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleDistMeasureError(errMsg));
        });
}
