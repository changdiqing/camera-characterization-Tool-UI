import React from "react";
import { Row, Col, Button, Divider } from "antd";
import { useAppSelector } from "../../hooks";
import { uploadResoInputImg, removeResoInputImg, executeResoMeasure } from "../../services/ResoMeasureService";
import { ROUTE_IMAGE } from "../../constants";
import ImageList from "../ImageList/ImageList";
import SpinningCover from "../SpinningCover/SpinningCover";
import UploadButton from "../UploadButton/UploadButton";
import MtfCurve from "./MtfCurve";

export default function ResoMeasurePage() {
    const resoMeasureReducer = useAppSelector((state) => state.resoMeasure);
    const resoMeasure = useAppSelector((state) => state.resoMeasure.value);

    const getInputFile = (event: React.ChangeEvent<HTMLInputElement>): File | null => {
        let selectedFiles = (event.target as HTMLInputElement).files;
        let currentFile = selectedFiles && selectedFiles.length > 0 ? selectedFiles[0] : null;
        return currentFile;
    };

    const uploadInputImg = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (resoMeasure == null) {
            return;
        }
        let file = getInputFile(event);
        if (file != null) {
            uploadResoInputImg(resoMeasure.dut_id, file);
        }
    };
    const handleDeleteInputImg = (imgUrl: string) => {
        if (resoMeasure == null) {
            return;
        }

        let dut_id = resoMeasure.dut_id;
        removeResoInputImg(dut_id, imgUrl);
    };
    const measureReso = () => {
        if (resoMeasure == null) {
            return;
        }

        let dut_id = resoMeasure.dut_id;
        executeResoMeasure(dut_id);
    };

    return resoMeasure == null ? (
        <span>Empty Page</span>
    ) : (
        <>
            <Divider orientation="left" plain={true} dashed={false}>
                Input Images
            </Divider>
            <Row justify="start">
                <ImageList baseUrl={ROUTE_IMAGE} imgs={resoMeasure.input_imgs} onDelete={handleDeleteInputImg} />
                {resoMeasure.input_imgs.length >= 16 ? null : <UploadButton onChange={uploadInputImg} />}
            </Row>
            <Divider orientation="left" plain={true} dashed={false}>
                Execute
            </Divider>
            <Row justify="center">
                <Col span={8}>
                    <Button block={true} onClick={measureReso}>
                        Measure
                    </Button>
                </Col>
            </Row>
            <Divider orientation="left" plain={true} dashed={false}>
                Output
            </Divider>
            {resoMeasure.reso_result != null ? (
                <>
                    <Row>
                        <ImageList baseUrl={ROUTE_IMAGE} imgs={resoMeasure.reso_result.output_imgs} />
                    </Row>
                    <MtfCurve x={resoMeasure.reso_result.mtf[0]} y={resoMeasure.reso_result.mtf[1]} />
                </>
            ) : (
                ""
            )}
            <SpinningCover shouldDisplay={resoMeasureReducer.loading} />
        </>
    );
}
