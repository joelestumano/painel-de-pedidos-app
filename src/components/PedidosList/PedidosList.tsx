import "./PedidosList.scss";
import React, { useState, useEffect } from "react";
import { Pedido } from "../../types/Pedido.type";
import { Paginate } from "../../types/Paginate.type";
import { Row, Col, Container } from "react-bootstrap";
import { Loading } from "../Loading/Loading";
import { CardPedido } from "../CardPedido/CardPedido";
import { CardSistema } from "../CardSistema/CardSistema";
import { NadaPorAqui } from "../NadaPorAqui/NadaPorAqui";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PedidosList: React.FC = () => {

    const nodeRef = React.useRef(null);

    const limit: number = 1000;
    const status: string = "pendente";
    const limiteVisivel = 3;

    const [paginate, setPaginate] = useState<Paginate>();
    const [loading, setLoading] = useState(true);

    const [onUpdate, setOnUpdate] = useState(false);

    //const apiBaseUrl = 'http://localhost:3000/'
    const apiBaseUrl = "https://sg-api-b7fl.onrender.com/";

    useEffect(() => {
        carregarDadosPedidos();
        const eventSource = new EventSource(
            `${apiBaseUrl}v1/app/changed-collection`
        );
        eventSource.onmessage = function (event) {
            const eventName = JSON.parse(event.data).event.eventName;
            if (eventName === "changed-collection-pedidos") {
                carregarDadosPedidos();
            }
        };
        return () => {
            eventSource.close();
        };
    }, []);

    function carregarDadosPedidos() {
        fetch(
            `${apiBaseUrl}v1/pedidos/paginate?ativarPaginacao=true&pagina=1&limite=${limit}&status=${status}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((resp) => resp.json())
            .then((resp) => {
                setPaginate(resp);
                setLoading(false);
                /*  */
                setOnUpdate(true);
                setTimeout(() => {
                    setOnUpdate(false);
                }, 1000);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {paginate && paginate.documentos?.length > 0 ? (
                        <Container fluid={true}>
                            <Row className="flex-md-row-reverse" style={{ minHeight: "60vh" }}>
                                <Col className="col-12 col-md-4">
                                    <CardSistema onUpdate={onUpdate} paginate={paginate} />
                                </Col>
                                <Col className="col-12 col-md-8">
                                    <CardPedido isPrincipal={true} pedido={paginate.documentos[0] as Pedido} />
                                </Col>
                            </Row>
                            <TransitionGroup component={Row} className="flex-grow-1" nodeRef={nodeRef}>
                                {paginate.documentos.slice(1, limiteVisivel).map((pedido: Pedido, index) => (
                                    <CSSTransition
                                        key={index}
                                        classNames="fade"
                                        timeout={500}
                                        appear
                                    >
                                        <Col className="col-12 col-md-6 col-lg-4">
                                            <CardPedido pedido={pedido} />
                                        </Col>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </Container>
                    ) : (
                        <NadaPorAqui titulo={'Nada por aqui!'} />
                    )}
                </>
            )}
        </>
    );
};

export default PedidosList;
