import { Card, Col, Row } from "react-bootstrap";
import { Pedido } from "../../types/Pedido.type";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { NumeroPedido } from "../NumeroPedido/NumeroPedido";
import { Icon } from "../Icon";

export const CardPedido = ({ ...props }) => {

    function getImgs(pedido: Pedido): string[] {
        return pedido.items.map((item: any, index: number) => item.bannerUrl);
    }

    let despacho = new Date(props.pedido?.horaDespacho);

    return (
        <Card className="h-100 border-0 p-2">
            <Row className="h-100 bg-primary bg-opacity-25 rounded">
                <Col className="col-md-6 p-3">
                    <ImageGallery images={getImgs(props.pedido)} />
                </Col>
                <Col className="col-md-6 p-3 ps-0">
                    <NumeroPedido value={props.pedido.codigo} />
                    <h6><Icon iconName="Clock" size={16} className="align-middle me-1" />
                        {despacho.toLocaleDateString()} às {despacho.toLocaleTimeString()}</h6>
                    <ul className="list-group">
                        {props.pedido.items.map((item: any, index: number) => (
                            <li className="list-group-item border-0 bg-transparent p-0 my-1" key={index}>
                                <span className="card-text p-1 px-2 rounded-2 bg-primary bg-opacity-25">
                                    <small className="">{item.descricao} R$ {(item.valor.toFixed(2).replace('.', ','))}</small>
                                </span>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Card>
    );
};