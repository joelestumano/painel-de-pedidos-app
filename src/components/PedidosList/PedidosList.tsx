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

const PedidosList: React.FC<{}> = () => {

    const OnlineStatusContext = React.createContext(false);
    const nodeRef = React.useRef(null)

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

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        if (isOnline) {
            carregarDadosPedidos();
        }
    }, [isOnline]);

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
                <OnlineStatusContext.Provider value={isOnline}>
                    {paginate && paginate.documentos?.length > 0 ? (
                        <Container fluid={true} className={`${isOnline ? '' : 'bg-danger bg-opacity-25'}`}>
                            <Row>
                                <Col className="col-12 col-md-8">
                                    <Row style={{ minHeight: "60vh" }}>
                                        <Col className="col-12 col-md-12">
                                            <CardPedido isPrincipal={true} pedido={paginate.documentos[0] as Pedido} />
                                        </Col>
                                    </Row>
                                    <TransitionGroup component={Row} className="flex-grow-1" noderef={nodeRef}>
                                        {paginate.documentos.slice(1, limiteVisivel).map((pedido: Pedido, index) => (
                                            <CSSTransition
                                                key={index}
                                                classNames="fade"
                                                timeout={500}
                                                ref={nodeRef}
                                            >
                                                <Col className="col-12 col-md-6 col-lg-6">
                                                    <CardPedido pedido={pedido} />
                                                </Col>
                                            </CSSTransition>
                                        ))}
                                    </TransitionGroup>
                                </Col>
                                <Col className="col-12 col-md-4">
                                    <CardSistema onUpdate={onUpdate} paginate={paginate} />
                                </Col>
                            </Row>
                        </Container>
                    ) : (
                        <NadaPorAqui titulo={'Nada por aqui!'} />
                    )}
                </OnlineStatusContext.Provider>
            )}
        </>
    );
};

export default PedidosList;
