import { Icon } from "./Icon";

export const PedidoCard = ({ ...props }) => {
  let despacho = new Date(props.pedido?.horaDespacho);
  return (
    <>
      <div className="card border-primary">
        <div className="card-body">
          <h5 className="card-title">{props.pedido?.cliente.nome} <Icon iconName="Clock" color="white" size={24} className="align-middle" /> {despacho.toLocaleDateString()} às {despacho.toLocaleTimeString()}</h5>
          <p className="card-text"><span className="bg-primary rounded-2 px-2">{props.pedido.codigo}</span> {props.pedido.status}</p>
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
