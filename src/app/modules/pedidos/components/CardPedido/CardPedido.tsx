import "./CardPedido.scss";
import { Card, Col, Row } from "react-bootstrap";
import { PedidoType } from "../../types/Pedido.type";
import { ImageGallery } from "../../../../shared/components/ImageGallery/ImageGallery";
import { NumeroPedido } from "../NumeroPedido/NumeroPedido";
import { BsIcon } from "../../../../shared/components/BsIcon/BsIcon";
import { Detalhes } from "../Detalhes/Detalhes";
import { ProgressbarPedido } from "../ProgressbarPedido/ProgressbarPedido";
import { PedidosTimeService } from "../../services/PedidosTime.service";

const TextTitle = ({ ...props }) => {
    return (
        <p className="p-1 px-2 fw-bold rounded-2 bg-primary bg-opacity-25 width-fit-content font-size-custom mb-2">
            {props.cliente}
        </p>
    );
};

export const CardPedido = ({ ...props }) => {

    function getImgs(pedido: PedidoType): string[] {
        return pedido.items.map((item: any, index: number) => item.bannerUrl);
    }

    let despacho = new Date(PedidosTimeService.subtractTenMinutes(props.pedido?.horaDespacho));

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
                                <TextTitle cliente={props.pedido.cliente.nome} />
                            ) : null}
                            <NumeroPedido isPrincipal={props.isPrincipal} value={props.pedido.codigo} />
                            <p className="font-size-custom fw-semibold mb-2">
                                <BsIcon iconName="Clock" className="align-middle me-1" />
                                {despacho.toLocaleTimeString()}
                            </p>
                            <ul className="list-group">
                                {props.pedido.items.map((item: any, index: number) => (
                                    <li className="list-group-item border-0 bg-transparent p-0" key={index}>
                                        <TextTitle cliente={`${item.descricao} R$: ${item.valor.toFixed(2).replace(".", ",")}`} />
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
                <Col className="col-12 col-md-12">
                    <ProgressbarPedido targetDateTime={(despacho).toISOString()} />
                </Col>
            </Row>
        </Card>
    );
};
