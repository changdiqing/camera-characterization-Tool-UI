import * as React from "react";
import PlotlyChart from "react-plotlyjs-ts";

export default function MtfCurve(props: { x: number[]; y: number[] }) {
    const handleClick = (evt: any) => alert("click");
    const data = [
        {
            marker: {
                color: "rgb(16, 32, 77)",
            },
            type: "lines",
            x: props.x,
            y: props.y,
        },
    ];
    const layout = {
        title: "Modulation Transfer Function",
        xaxis: {
            title: "Spatial Frequency (Cycles/Pixel)",
        },
        yaxis: {
            title: "Modulation Facctor",
        },
    };
    return <PlotlyChart data={data} layout={layout} onClick={handleClick} />;
}
