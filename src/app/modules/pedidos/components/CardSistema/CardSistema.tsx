import "./CardSistema.scss";
import { Card, Col, Row } from "react-bootstrap";
import { Bells } from "../Bells/Bells";
import { Paginate } from "../../../../shared/types/Paginate.type";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { PedidoType } from "../../types/Pedido.type";
import { CardPedido } from "../CardPedido/CardPedido";
import React from "react";
import { useSelector } from "react-redux";

export const CardSistema: React.FC<{ onUpdate: boolean, paginate: Paginate }> = ({ onUpdate, paginate }) => {

    const { pedidosAtrasados } = useSelector((rootReducer: any) => rootReducer.PedidosReducer);

    const nodeRef = React.useRef(null);

    const limit: number = 1000;
    const limiteVisivel = 3;

    const isNext = (paginate.totalDocumentos - limiteVisivel) > 0

    function getProximosPedidos(): PedidoType[] {
        return paginate.documentos.slice(limiteVisivel, limit);
    }

    return (
        <Card className="h-100_ border-0 p-2 bg-transparent" style={{ height: '100vh' }}>
            <Row className={`h-auto bg-primary bg-opacity-25 shadow rounded`}>
                <Col className="col-8 col-md-8 p-3">
                    <Row>
                        {isNext ?
                            <Col>
                                <ul className="list-group">
                                    <li className="list-group-item bg-transparent px-0 py-1 border-0">
                                        <label className="position-relative w-auto bg-white rounded px-2 py-1 fw-semibold">
                                            Próximos pedidos
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success fs-5">
                                                {paginate.totalDocumentos - limiteVisivel}
                                                <span className="visually-hidden">
                                                    {paginate.totalDocumentos - limiteVisivel}
                                                </span>
                                            </span>
                                        </label>
                                    </li>
                                    {pedidosAtrasados > 0 ?
                                        <li className="list-group-item bg-transparent px-0 py-1 border-0">
                                            <label className="position-relative w-auto bg-white rounded px-2 py-1 fw-semibold">
                                                Em atraso
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-5">
                                                    {pedidosAtrasados}
                                                    <span className="visually-hidden">
                                                        {pedidosAtrasados}
                                                    </span>
                                                </span>
                                            </label>
                                        </li>
                                        : null}
                                </ul>
                            </Col>
                            : null}
                    </Row>
                </Col>
                <Col className="col-4 col-md-4 p-3">
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Bells ring={onUpdate}></Bells>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <TransitionGroup component={Row} className="h-100 d-block overflow-auto" noderef={nodeRef}>
                {getProximosPedidos().map((pedido: PedidoType, index) => (
                    <CSSTransition
                        key={index}
                        classNames="fade"
                        timeout={500}
                        ref={nodeRef}
                    >
                        <Col className="col-12">
                            <CardPedido pedido={pedido} />
                        </Col>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </Card>
    );
};
