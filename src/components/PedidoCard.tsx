import { Pedido } from "../types/Pedido.type";
import { Icon } from "./Icon";

export const PedidoCard = ({ ...props }) => {
  let despacho = new Date(props.pedido?.horaDespacho);
  return (
    <>
      <div className={`card w-100 h-100 border-0  ${ props.isPrincipal ? "bg-transparent" : "bg-primary bg-opacity-25"}`}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={props.pedido.items[0].bannerUrl} className="img-fluid" alt="item" />
          </div>
          <div className="col-md-8">
            <div className="card-body p-1">
              <div className="col">
                <ul className="list-group ">
                  {props.pedido.items.map((item: any) =>
                    <li className="list-group-item border-0 bg-transparent" key={item}>
                      <span className="card-text p-1 rounded-2 bg-primary bg-opacity-25">
                        <small className="">{item.descricao} R$ {item.valor}</small>
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  <div className="card border-primary">
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
      </div> */}
    </>
  );
};
