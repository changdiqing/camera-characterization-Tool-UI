import React, { useState } from "react";
import { Row, Col, Button, Modal, Divider } from "antd";
import { useAppSelector } from "../../hooks";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import { uploadDistInputImg, removeDistInputImg, executeDistMeasure } from "../../services/DistMeasureService";
import { ROUTE_IMAGE } from "../../constants";
import ImageList from "../ImageList/ImageList";
import SpinningCover from "../SpinningCover/SpinningCover";
import UploadButton from "../UploadButton/UploadButton";
import Matrix2D from "../Matrix2D/Matrix2D";
import DistResultView from "./DistResult";

function getBase64(file: RcFile): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

// No need to define the defaultProps property
export default function DistMeasurePage() {
    // The `state` arg is correctly typed as `RootState` already
    const distMeasureSlice = useAppSelector((state) => state.distMeasure);
    //const distMeasure = distMeasureSlice.value;
    const distMeasure = useAppSelector((state) => state.distMeasure.value);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | undefined>("");
    const [previewTitle, setPreviewTitle] = useState("");
    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            getBase64(file.originFileObj!).then((data) => {
                if (data != null) {
                    file.preview = data as string;
                }
            });
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (distMeasure == null) {
            return;
        }
        let selectedFiles = (event.target as HTMLInputElement).files;
        if (selectedFiles == null || selectedFiles.length == 0) {
            return;
        }
        let currentFile = selectedFiles[0];
        uploadDistInputImg(distMeasure.dut_id, currentFile);
    };

    const handleDeleteImg = (imgUrl: string) => {
        if (distMeasure == null) {
            return;
        }

        let dut_id = distMeasure.dut_id;
        removeDistInputImg(dut_id, imgUrl);
    };

    const measureDistortion = () => {
        if (distMeasure == null) {
            return;
        }

        let dut_id = distMeasure.dut_id;
        executeDistMeasure(dut_id);
    };

    return distMeasure == null ? (
        <span>Empty Page</span>
    ) : (
        <div>
            <Divider orientation="left" plain={true} dashed={false}>
                Input
            </Divider>
            <Row justify="start" style={{ position: "relative" }}>
                <ImageList baseUrl={ROUTE_IMAGE} imgs={distMeasure.input_imgs} onDelete={handleDeleteImg} />
                {distMeasure.input_imgs.length >= 16 ? null : <UploadButton onChange={selectFile} />}
                <SpinningCover shouldDisplay={distMeasureSlice.inputLoading} />
            </Row>
            <Divider orientation="left" plain={true} dashed={false}>
                Execute
            </Divider>
            <Row justify="center" style={{ position: "relative" }}>
                <Col span={8}>
                    <Button block={true} onClick={measureDistortion}>
                        Measure
                    </Button>
                </Col>
                <SpinningCover shouldDisplay={distMeasureSlice.resultLoading} />
            </Row>
            <Divider orientation="left" plain={true} dashed={false}>
                Output
            </Divider>
            {distMeasure.dist_result != null ? <DistResultView distResult={distMeasure.dist_result} /> : ""}
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </div>
    );
}
