import { Row, Space, Typography } from "antd";
import { DistResult } from "../../models/DistMeasure";
import ImageList from "../ImageList/ImageList";
import { ROUTE_IMAGE } from "../../constants";
import Matrix2D from "../Matrix2D/Matrix2D";
import "./DistResult.css";

//const {Title} = Typography

export default function DistResultView(props: { distResult: DistResult }) {
    return (
        <div className="dist-result">
            <ImageList baseUrl={ROUTE_IMAGE} imgs={props.distResult.output_imgs} />
            <br />
            Rotation Vectors:
            <br />
            <Space direction="horizontal">
                {props.distResult.rvecs.map((rvec: number[][]) => {
                    return (
                        <div className="vect-wrapper">
                            <Matrix2D matrix={rvec} rounded={true} />
                        </div>
                    );
                })}
            </Space>
            <br />
            Translation Vectors:
            <br />
            <Space direction="horizontal">
                {props.distResult.tvecs.map((tvec: number[][]) => {
                    return (
                        <div className="vect-wrapper">
                            <Matrix2D matrix={tvec} rounded={true} />
                        </div>
                    );
                })}
            </Space>
            <br />
            Distortion Coefficients:
            <br />
            <Matrix2D matrix={props.distResult.dist} rounded={false} />
            Error: {props.distResult.error}
        </div>
    );
}
