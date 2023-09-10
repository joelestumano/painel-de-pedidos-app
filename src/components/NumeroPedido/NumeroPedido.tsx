export function NumeroPedido({ ...props }) {
    return (
        <h6 className={`fw-semibold ${props.isPrincipal ? "fs-4" : ""}`}>
            Pedido
            <span className="ms-2 bg-warning rounded-start ps-2 pe-1">
                {props.value.slice(0, 6)}
            </span>
            <span className="bg-success text-white rounded-end ps-1 pe-2">
                {(props.value.slice(6)).replace(' ', '')}
            </span>
        </h6>
    );
}
