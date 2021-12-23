import { PlusOutlined } from "@ant-design/icons";
import "./UploadButton.css";

export default function UploadButton(props: { onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <label className="label">
            <input type="file" required onChange={props.onChange} />
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </label>
    );
}
