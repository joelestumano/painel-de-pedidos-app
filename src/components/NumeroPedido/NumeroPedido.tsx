export const NumeroPedido: React.FC<{ isPrincipal: boolean, value: string }> = ({ isPrincipal, value }) => {
    return (
        <h6 className={`fw-semibold ${isPrincipal ? "fs-5" : ""}`}>
            <span className="bg-warning rounded-start ps-2 pe-1">
                {value.slice(0, 6)}
            </span>
            <span className="bg-success text-white rounded-end ps-1 pe-2">
                {(value.slice(6))}
            </span>
        </h6>
    );
}
