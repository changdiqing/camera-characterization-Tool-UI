import { Image, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./ImageList.css";

// No need to define the defaultProps property
export default function ImgList(props: { baseUrl: string; imgs: string[]; onDelete?: (item: string) => void }) {
    return (
        <Space direction="horizontal">
            {props.imgs.map(function (d: string, idx: number) {
                return (
                    <div className="img-wrapper" key={idx}>
                        <Image src={props.baseUrl + "/" + d} key={idx} width="6.5rem" height="6.5rem" />
                        {props.onDelete ? (
                            <Button
                                className="hover-button"
                                icon={<DeleteOutlined />}
                                onClick={() => props.onDelete!(d)}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                );
            })}
        </Space>
    );
}
