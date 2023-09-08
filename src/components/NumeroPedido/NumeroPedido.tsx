export function NumeroPedido({ ...props }) {
    return (
        <h6 className={`fw-semibold ${props.isPrincipal ? "fs-4" : ""}`}>
            Pedido
            <span className="ms-2 bg-warning rounded-start ps-2">
                {props.value.slice(0, 6)}
            </span>
            <span className="bg-success text-white rounded-end pe-2">
                {props.value.slice(6)}
            </span>
        </h6>
    );
}
