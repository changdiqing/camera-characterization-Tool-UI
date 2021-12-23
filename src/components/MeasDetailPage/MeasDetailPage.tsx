import React from "react";
import { Radio, RadioChangeEvent, Row } from "antd";
import { Switch, Route, useHistory } from "react-router-dom";
import DistMeasurePage from "../DistMeasure/DistMeasurePage";
import ColorMeasurePage from "../ColorMeasure/ColorMeasurePage";
import ResoMeasurePage from "../ResoMeasure/ResoMeasurePage";

export default function MeasDetailPage() {
    const [page, setPage] = React.useState("/distortion");
    const history = useHistory();

    const handlePageChange = (e: RadioChangeEvent) => {
        setPage(e.target.value);
        history.push(e.target.value);
    };
    return (
        <div>
            <Row justify="center">
                <Radio.Group value={page} onChange={handlePageChange}>
                    <Radio.Button value="/distortion">distortion</Radio.Button>

                    <Radio.Button value="/color">color</Radio.Button>

                    <Radio.Button value="/resolution">resolution</Radio.Button>
                </Radio.Group>
            </Row>
            <Switch>
                <Route path="/distortion" component={DistMeasurePage} />
                <Route path="/color" component={ColorMeasurePage} />
                <Route path="/resolution" component={ResoMeasurePage} />
            </Switch>
        </div>
    );
}
