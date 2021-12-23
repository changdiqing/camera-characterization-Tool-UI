import "./Matrix2d.css";
export default function Matrix2D(props: { matrix: number[][]; rounded: Boolean }) {
    return (
        <>
            {props.matrix[0].map((row, index_col) => (
                <ul className="nullbullet" key={index_col}>
                    {props.matrix.map((item, index) => {
                        let value = props.rounded ? Math.round(item[index_col] * 100) / 100 : item[index_col];
                        return <li key={index}>{value}</li>;
                    })}
                </ul>
            ))}
        </>
    );
}
