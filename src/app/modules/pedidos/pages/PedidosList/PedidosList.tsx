import "./PedidosList.scss";
import React, { useState, useEffect } from "react";
import { PedidoType } from "../../types/pedido.type";
import { Row, Col, Container } from "react-bootstrap";
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { CardPedidoComponent } from "../../components/card-pedido/card-pedido.component";
import { ColunaSistemaComponent } from "../../components/coluna-sistema/coluna-sistema.component";
import { NadaPorAquiComponent } from "../../components/nada-por-aqui/nada-por-aqui.component";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { PedidosApiService } from "../../services/pedidos-api.service";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_TYPE } from "../../../../../redux/pedidos/ActionType.enum";
import { PaginateType } from "../../../../shared/types/paginate.type";

const PedidosList: React.FC<{}> = () => {

    const dispatch = useDispatch();
    const { pedidos } = useSelector((rootReducer: any) => rootReducer.PedidosReducer);

    const nodeRef = React.useRef(null)

    const limiteVisivel = 3;

    const [loading, setLoading] = useState(true);
    const [onUpdate, setOnUpdate] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const apiBaseUrl = "https://sg-api-b7fl.onrender.com/";

    useEffect(() => {
        const carregarDadosPedidos = () => {
            PedidosApiService.getPaginate()
                .then((resp: PaginateType) => {
                    /*  */
                    dispatch({
                        type: ACTION_TYPE.LISTAR_PEDIDOS,
                        payload: resp.documentos
                    })
                    /*  */
                    setLoading(false);
                    setOnUpdate(true);
                    setTimeout(() => {
                        setOnUpdate(false);
                    }, 1000);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        //carregarDadosPedidos();
        const eventSource = new EventSource(
            `${apiBaseUrl}v1/app/changed-collection`
        );
        eventSource.onmessage = function (event) {
            const eventName = JSON.parse(event.data).event.eventName;
            if (eventName === "changed-collection-pedidos") {
                carregarDadosPedidos();
            }
        };

        if (isOnline) {
            carregarDadosPedidos();
        }

        return () => {
            eventSource.close();
        };
    }, [isOnline, dispatch]);

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

    return (
        <>
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    {pedidos && pedidos.length > 0 ? (
                        <Container fluid={true} className={`${isOnline ? '' : 'bg-danger bg-opacity-25'}`}>
                            <Row>
                                <Col className="col-12 col-md-8">
                                    <Row style={{ minHeight: "60vh" }}>
                                        <Col className="col-12 col-md-12">
                                            <CardPedidoComponent isPrincipal={true} pedido={pedidos[0] as PedidoType} />
                                        </Col>
                                    </Row>
                                    <TransitionGroup component={Row} className="flex-grow-1" noderef={nodeRef}>
                                        {pedidos.slice(1, limiteVisivel).map((pedido: PedidoType, index: number) => (
                                            <CSSTransition
                                                key={index}
                                                classNames="fade"
                                                timeout={500}
                                                ref={nodeRef}
                                            >
                                                <Col className="col-12 col-md-6 col-lg-6">
                                                    <CardPedidoComponent pedido={pedido} />
                                                </Col>
                                            </CSSTransition>
                                        ))}
                                    </TransitionGroup>
                                </Col>
                                <Col className="col-12 col-md-4">
                                    <ColunaSistemaComponent onUpdate={onUpdate} />
                                </Col>
                            </Row>
                        </Container>
                    ) : (
                        <NadaPorAquiComponent titulo={'Nada por aqui!'} />
                    )}
                </>
            )}
        </>
    );
};

export default PedidosList;