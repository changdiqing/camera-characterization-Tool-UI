export interface ResoResult {
    output_imgs: string[];
    mtf: number[][];
}

export interface ResoMeasure {
    _id: string;
    dut_id: string;
    input_imgs: string[];
    createTime: Date;
    reso_result: ResoResult;
}
