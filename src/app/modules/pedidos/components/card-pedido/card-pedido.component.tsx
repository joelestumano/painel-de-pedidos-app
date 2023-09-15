import "./card-pedido.component.scss";
import { Card, Col, Row } from "react-bootstrap";
import { PedidoType } from "../../types/pedido.type";
import { ImageGalleryComponent } from "../../../../shared/components/image-gallery/image-gallery.component";
import { NumeroPedido } from "../NumeroPedido/NumeroPedido";
import { InfoPedidoComponent } from "../info-pedido/info-pedido.component";
import { ProgressbarPedido } from "../ProgressbarPedido/ProgressbarPedido";
import { PedidosTimeService } from "../../services/pedidos-time.service";
import { BsIconComponent } from "../../../../shared/components/bs-icon/bs-icon.component";

const TextTitle = ({ ...props }) => {
    return (
        <p className="p-1 px-2 fw-bold rounded-2 bg-primary bg-opacity-25 width-fit-content font-size-custom mb-2">
            {props.cliente}
        </p>
    );
};

export const CardPedidoComponent = ({ ...props }) => {

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
                    <ImageGalleryComponent images={getImgs(props.pedido)} />
                </Col>
                <Col className="col-12 col-md-6 p-3 ps-md-0">
                    <Row>
                        <Col>
                            {props.isPrincipal ? (
                                <TextTitle cliente={props.pedido.cliente.nome} />
                            ) : null}
                            <NumeroPedido isPrincipal={props.isPrincipal} value={props.pedido.codigo} />
                            <p className="font-size-custom fw-semibold mb-2">
                                <BsIconComponent iconName="Clock" className="align-middle me-1" />
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
                                <InfoPedidoComponent pedido={props.pedido}></InfoPedidoComponent>
                            </Col>
                        ) : null}
                    </Row>
                </Col>
                <Col className="col-12 col-md-12">
                    <ProgressbarPedido pedido={props.pedido} />
                </Col>
            </Row>
        </Card>
    );
};
