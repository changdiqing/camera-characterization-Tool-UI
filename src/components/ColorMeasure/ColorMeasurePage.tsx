import React from "react";
import { Row, Col, Button, Divider, Menu, Dropdown } from "antd";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { DownOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks";
import {
    uploadColorInputImg,
    uploadColorRefImg,
    removeColorInputImg,
    removeColorRefImg,
    executeColorMeasure,
} from "../../services/ColorMeasureService";
import { ROUTE_IMAGE } from "../../constants";
import ImageList from "../ImageList/ImageList";
import SpinningCover from "../SpinningCover/SpinningCover";
import UploadButton from "../UploadButton/UploadButton";
import Matrix2D from "../Matrix2D/Matrix2D";

export default function ColorMeasurePage() {
    const colorMeasureReducer = useAppSelector((state) => state.colorMeasure);
    const colorMeasure = useAppSelector((state) => state.colorMeasure.value);

    const getInputFile = (event: React.ChangeEvent<HTMLInputElement>): File | null => {
        let selectedFiles = (event.target as HTMLInputElement).files;
        let currentFile = selectedFiles && selectedFiles.length > 0 ? selectedFiles[0] : null;
        return currentFile;
    };

    const uploadInputImg = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (colorMeasure == null) {
            return;
        }
        let file = getInputFile(event);
        if (file != null) {
            uploadColorInputImg(colorMeasure.dut_id, file);
        }
    };
    const uploadRefImg = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (colorMeasure == null) {
            return;
        }
        let file = getInputFile(event);
        if (file != null) {
            uploadColorRefImg(colorMeasure.dut_id, file);
        }
    };
    const handleDeleteInputImg = (imgUrl: string) => {
        if (colorMeasure == null) {
            return;
        }

        let dut_id = colorMeasure.dut_id;
        removeColorInputImg(dut_id, imgUrl);
    };
    const handleDeleteRefImg = (imgUrl: string) => {
        if (colorMeasure == null) {
            return;
        }

        let dut_id = colorMeasure.dut_id;
        removeColorRefImg(dut_id, imgUrl);
    };

    const measureColor = () => {
        if (colorMeasure == null) {
            return;
        }

        let dut_id = colorMeasure.dut_id;
        executeColorMeasure(dut_id);
    };

    const handleMenuClick: MenuClickEventHandler = (info) => {
        console.log("click", info.key);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="D50">D50</Menu.Item>
            <Menu.Item key="D65">D65</Menu.Item>
        </Menu>
    );

    return colorMeasure == null ? (
        <span>Empty Page</span>
    ) : (
        <>
            <Divider orientation="left" plain={true} dashed={false}>
                Source Images
            </Divider>
            Illuminant:{" "}
            <Dropdown overlay={menu}>
                <Button>
                    D50
                    <DownOutlined />
                </Button>
            </Dropdown>
            <Row justify="start" style={{ position: "relative" }}>
                <ImageList baseUrl={ROUTE_IMAGE} imgs={colorMeasure.input_imgs} onDelete={handleDeleteInputImg} />
                {colorMeasure.input_imgs.length >= 16 ? null : <UploadButton onChange={uploadInputImg} />}
                <SpinningCover shouldDisplay={colorMeasureReducer.inputLoading} />
            </Row>
            <Divider orientation="left" plain={true} dashed={false}>
                Reference Images
            </Divider>
            <Row justify="start" style={{ position: "relative" }}>
                <ImageList baseUrl={ROUTE_IMAGE} imgs={colorMeasure.ref_imgs} onDelete={handleDeleteRefImg} />
                {colorMeasure.ref_imgs.length >= 16 ? null : <UploadButton onChange={uploadRefImg} />}
                <SpinningCover shouldDisplay={colorMeasureReducer.refLoading} />
            </Row>
            <Divider orientation="left" plain={true} dashed={false}>
                Execute
            </Divider>
            <Row justify="center" style={{ position: "relative" }}>
                <Col span={8}>
                    <Button block={true} onClick={measureColor}>
                        Measure
                    </Button>
                </Col>
                <SpinningCover shouldDisplay={colorMeasureReducer.resultLoading} />
            </Row>
            <Divider orientation="left" plain={true} dashed={false}>
                Output
            </Divider>
            {colorMeasure.color_result != null ? (
                <>
                    <Row>
                        <ImageList baseUrl={ROUTE_IMAGE} imgs={colorMeasure.color_result.output_imgs} />
                    </Row>
                    <Row>Color Correction Matrix:</Row>
                    <Row>
                        <Matrix2D matrix={colorMeasure.color_result.ccm} rounded={false} />
                    </Row>
                    <Row>Color Difference (CIEDE2000): 2.6981</Row>
                    <Row>Cut-Off Rate: 0.211 </Row>
                </>
            ) : (
                ""
            )}
            <SpinningCover shouldDisplay={colorMeasureReducer.measureLoading} />
        </>
    );
}
