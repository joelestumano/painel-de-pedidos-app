import { Icon } from "./icon.component";

export const PedidoComponent = ({ ...props }) => {
  let despacho = new Date(props.pedido?.horaDespacho);
  return (
    <>
      <div className="card border-primary">
        <div className="card-body">
          <h5 className="card-title">{props.pedido?.cliente.nome} <Icon iconName="Clock" color="white" size={24} className="align-middle" /> {despacho.toLocaleDateString()} às {despacho.toLocaleTimeString()}</h5>
          <p className="card-text">{props.pedido.status}</p>
          <ul className="list-group">
            {props.pedido.items.length > 0 &&
              props.pedido.items.map((item: any, index: number) => <li key={index} className="list-group-item border-0">
                <img src={item.bannerUrl} className="" height={64} width={64} alt="item" />
                <p>R$: {item.valor} de {item.descricao}</p>
              </li>
              )}
          </ul>
        </div>
      </div>
    </>
  );
};
