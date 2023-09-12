import { Card, Col, Row } from "react-bootstrap";
import { Pedido } from "../../types/Pedido.type";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { NumeroPedido } from "../NumeroPedido/NumeroPedido";
import { Icon } from "../Icon";
import { Detalhes } from "../Detalhes/Detalhes";

const Section = ({ ...props }) => {
    return (
        <span className="card-text p-1 px-3 fs-5 fw-bold rounded-2 bg-primary bg-opacity-25">
            <small className="">{props.cliente}</small>
        </span>
    );
};

export const CardPedido = ({ ...props }) => {
    function getImgs(pedido: Pedido): string[] {
        return pedido.items.map((item: any, index: number) => item.bannerUrl);
    }

    let despacho = new Date(props.pedido?.horaDespacho);

    return (
        <Card className="h-100 border-0 p-2 bg-transparent">
            <Row
                className={`h-100 rounded ${props.isPrincipal
                    ? "bg-white bg-opacity-50 shadow"
                    : "bg-primary bg-opacity-10"
                    }`}
            >
                <Col className="col-12 col-md-6 p-3">
                    <ImageGallery images={getImgs(props.pedido)} />
                </Col>
                <Col className="col-12 col-md-6 p-3 ps-md-0">
                    <Row>
                        <Col>
                            {props.isPrincipal ? (
                                <div className="d-flex align-items-center mb-3">
                                    <Section cliente={props.pedido.cliente.nome} />
                                </div>
                            ) : null}
                            <NumeroPedido isPrincipal={props.isPrincipal} value={props.pedido.codigo} />
                            <h6>
                                <Icon
                                    iconName="Clock"
                                    size={16}
                                    className="align-middle me-1"
                                />
                                {despacho.toLocaleTimeString()}
                            </h6>
                            <ul className="list-group">
                                {props.pedido.items.map((item: any, index: number) => (
                                    <li
                                        className="list-group-item border-0 bg-transparent p-0 my-1"
                                        key={index}
                                    >
                                        <span className="card-text p-1 px-2 rounded-2 bg-primary bg-opacity-25 fw-bold">
                                            <small className="">
                                                {item.descricao} R${" "}
                                                {item.valor.toFixed(2).replace(".", ",")}
                                            </small>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Col>

                        {props.isPrincipal ? (
                            <Col>
                                <Detalhes pedido={props.pedido}></Detalhes>
                            </Col>
                        ) : null}
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};
