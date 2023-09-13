import "./CardSistema.scss";
import { Card, Col, Row } from "react-bootstrap";
import { Bells } from "../Bells/Bells";
import { Paginate } from "../../app/shared/types/Paginate.type";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { PedidoType } from "../../app/modules/pedidos/types/Pedido.type";
import { CardPedido } from "../CardPedido/CardPedido";
import React from "react";

export const CardSistema: React.FC<{ onUpdate: boolean, paginate: Paginate }> = ({ onUpdate, paginate }) => {

    const nodeRef = React.useRef(null);

    const limit: number = 1000;
    const limiteVisivel = 3;

    const isNext = (paginate.totalDocumentos - limiteVisivel) > 0

    return (
        <Card className="h-100_ border-0 p-2 bg-transparent" style={{ height: '100vh' }}>
            <Row className={`h-auto bg-primary bg-opacity-25 shadow rounded`}>
                <Col className="col-8 col-md-8 p-3">

                    <Row className="mt-2">
                        <Col>
                            {isNext ? <label className="position-relative w-auto bg-white rounded px-2 py-1 fw-semibold">
                                Próximos pedidos
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success fs-5">
                                    {paginate.totalDocumentos - limiteVisivel}
                                    <span className="visually-hidden">
                                        {paginate.totalDocumentos - limiteVisivel}
                                    </span>
                                </span>
                            </label> : null}
                        </Col>
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
            <TransitionGroup component={Row} className="h-100 overflow-auto" noderef={nodeRef}>
                <Col className="col-12 col-md-12"> {paginate.documentos.slice(limiteVisivel, limit).map((pedido: PedidoType, index) => (
                    <CSSTransition
                        key={index}
                        classNames="fade"
                        timeout={500}
                        ref={nodeRef}
                    >
                        <div>
                            <CardPedido pedido={pedido} />
                        </div>
                    </CSSTransition>
                ))}
                </Col>
            </TransitionGroup>
        </Card>
    );
};
