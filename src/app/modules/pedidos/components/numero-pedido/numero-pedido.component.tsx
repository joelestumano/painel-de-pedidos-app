import "./numero-pedido.component.scss";
export const NumeroPedido: React.FC<{ isPrincipal: boolean, value: string }> = ({ isPrincipal, value }) => {
    return (
        <p className={`fw-semibold mb-1 font-size-custom ${isPrincipal ? "" : ""}`}>
            <span className="bg-warning rounded-start ps-2 pe-1">
                {value.slice(0, 6)}
            </span>
            <span className="bg-success text-white rounded-end ps-1 pe-2">
                {(value.slice(6))}
            </span>
        </p>
    );
}
