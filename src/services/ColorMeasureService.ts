/*
    Services for CRUD operations on color measurements
*/
import axios from "axios";
import { ColorMeasure, ColorResult } from "../models/ColorMeasure";
import { store } from "../redux/store";
import {
    fetchColorMeasureStart,
    fetchColorMeasureSuccess,
    handleColorInputImgsStart,
    uploadColorInputImgSuccess,
    handleColorRefImgStart,
    uploadColorRefImgSuccess,
    fetchColorResultStart,
    fetchColorResultSuccess,
    removeColorInputImgSuccess,
    removeColorRefImgSuccess,
    handleColorMeasError,
} from "../redux/colorMeasureSlice";
import { message } from "antd";

export function fetchColorMeasure(dut_id: string) {
    store.dispatch(fetchColorMeasureStart());
    axios
        .get("http://127.0.0.1:5000/color", { params: { dut_id: dut_id } })
        .then((resp) => {
            let colorMeas: ColorMeasure = resp.data.color_meas;
            store.dispatch(fetchColorMeasureSuccess(colorMeas));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleColorMeasError(errMsg));
        });
}

export function executeColorMeasure(dut_id: string) {
    store.dispatch(fetchColorResultStart());
    axios
        .get("http://127.0.0.1:5000/color_exec", { params: { dut_id: dut_id } })
        .then((resp) => {
            let colorResult: ColorResult = resp.data.color_result;
            store.dispatch(fetchColorResultSuccess(colorResult));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleColorMeasError(errMsg));
        });
}

export function uploadColorInputImg(dut_id: string, file: File) {
    store.dispatch(handleColorInputImgsStart());
    const data = new FormData();
    data.append("dut_id", dut_id);
    data.append("file", file);
    axios
        .post("http://127.0.0.1:5000/color_input_img", data)
        .then((resp) => {
            let data = resp.data;
            let imageUrl = data.image_url;
            store.dispatch(uploadColorInputImgSuccess(imageUrl));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleColorMeasError(errMsg));
        });
}

export function uploadColorRefImg(dut_id: string, file: File) {
    store.dispatch(handleColorRefImgStart());
    const data = new FormData();
    data.append("dut_id", dut_id);
    data.append("file", file);
    axios
        .post("http://127.0.0.1:5000/color_ref_img", data)
        .then((resp) => {
            let data = resp.data;
            let imageUrl = data.image_url;
            store.dispatch(uploadColorRefImgSuccess(imageUrl));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleColorMeasError(errMsg));
        });
}
export function removeColorInputImg(dutId: string, imgUrl: string) {
    store.dispatch(handleColorInputImgsStart());
    let data = { dut_id: dutId, img_url: imgUrl };
    axios
        .delete("http://127.0.0.1:5000/color_input_img", { data: data })
        .then((resp) => {
            let data = resp.data;
            let imageUrl = data.image_url;
            store.dispatch(removeColorInputImgSuccess(imageUrl));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleColorMeasError(err.response));
        });
}

export function removeColorRefImg(dutId: string, imgUrl: string) {
    store.dispatch(handleColorRefImgStart());
    let data = { dut_id: dutId, img_url: imgUrl };
    axios
        .delete("http://127.0.0.1:5000/color_ref_img", { data: data })
        .then((resp) => {
            let data = resp.data;
            let imageUrl = data.image_url;
            store.dispatch(removeColorRefImgSuccess(imageUrl));
        })
        .catch((err) => {
            let errMsg = err.response;

            message.error(errMsg);
            console.error(errMsg);
            store.dispatch(handleColorMeasError(errMsg));
        });
}
