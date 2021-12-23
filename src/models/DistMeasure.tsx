export interface DistResult {
    mtx: number[][];
    dist: number[][];
    rvecs: number[][][];
    tvecs: number[][][];
    error: number;
    output_imgs: string[];
}

export interface DistMeasure {
    _id: string;
    dut_id: string;
    input_imgs: string[];
    createTime: Date;
    dist_result: DistResult;
}
