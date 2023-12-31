import "./CardPedidoComponent.scss";
import { Card, Col, Row } from "react-bootstrap";
import { ImageGalleryComponent } from "../../../../../shared/components/image-gallery/ImageGalleryComponent";
import { NumeroPedidoComponent } from "../numero-pedido/NumeroPedidoComponent";
import { InfoPedidoComponent } from "../info-pedido/InfoPedidoComponent";
import { ProgressbarPedidoComponent } from "../progressbar-pedido/ProgressbarPedidoComponent";
import { PedidosTimeService } from "../../services/PedidosTimeService";
import { BsIcon } from "../../../../../shared/components/BsIcon/BsIcon";
import { PedidoType } from "../../../../../shared/types/PedidoType";
import { PedidoItemType } from "../../../../../shared/types/ItemPedidoType";

const TextTitle = ({ ...props }) => {
    return (
        <p className="p-0 px-2 fw-bold rounded-2 bg-primary bg-opacity-25 width-fit-content font-size-custom mb-2 ff-cookie text-captalize fs-1">
            {props.cliente}
        </p>
    );
};

export const CardPedidoComponent = ({ ...props }) => {

    function getImgs(pedido: PedidoType): string[] {
        return pedido.items.map((item: PedidoItemType, index: number) => item._id.bannerUrl);
    }

    let despacho = new Date(PedidosTimeService.subtractMinutes(props.pedido?.horaDespacho, 10));

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
                                <BsIcon iconName="Clock" className="align-middle me-1" />
                                {despacho.toLocaleTimeString()}
                            </p>
                            <ul className="list-group">
                                {props.pedido.items.map((item: any, index: number) => (
                                    <li className="list-group-item border-0 bg-transparent p-0" key={index}>
                                        <TextTitle cliente={`${item._id.descricao} R$: ${item.valor.toFixed(2).replace(".", ",")}`} />
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
