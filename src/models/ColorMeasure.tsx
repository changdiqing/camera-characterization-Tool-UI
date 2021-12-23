export interface ColorResult {
    ccm: number[][];
    error: number;
    output_imgs: string[];
}

export interface ColorMeasure {
    _id: string;
    dut_id: string;
    input_imgs: string[];
    ref_imgs: string[];
    createTime: Date;
    color_result: ColorResult;
}
