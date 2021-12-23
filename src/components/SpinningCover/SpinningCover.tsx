import { Spin } from "antd";
import "./SpinningCover.css";

export default function SpinningCover(props: { shouldDisplay: boolean }) {
    return props.shouldDisplay ? (
        <div className="SpinningCover">
            <Spin />
        </div>
    ) : (
        <div />
    );
}
