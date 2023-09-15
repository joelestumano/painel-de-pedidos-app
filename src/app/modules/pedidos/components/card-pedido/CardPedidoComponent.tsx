import "./CardPedidoComponent.scss";
import { Card, Col, Row } from "react-bootstrap";
import { ImageGalleryComponent } from "../../../../shared/components/image-gallery/ImageGalleryComponent";
import { NumeroPedidoComponent } from "../numero-pedido/NumeroPedidoComponent";
import { InfoPedidoComponent } from "../info-pedido/InfoPedidoComponent";
import { ProgressbarPedidoComponent } from "../progressbar-pedido/ProgressbarPedidoComponent";
import { PedidosTimeService } from "../../services/PedidosTimeService";
import { BsIconComponent } from "../../../../shared/components/bs-icon/BsIconComponent";
import { PedidoType } from "../../../../shared/types/PedidoType";

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
                            <NumeroPedidoComponent isPrincipal={props.isPrincipal} value={props.pedido.codigo} />
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
                    <ProgressbarPedidoComponent pedido={props.pedido} />
                </Col>
            </Row>
        </Card>
    );
};
