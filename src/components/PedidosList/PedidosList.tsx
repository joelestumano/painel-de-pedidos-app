import "./PedidosList.scss";
import React, { useState, useEffect } from "react";
import { Pedido } from "../../types/Pedido.type";
import { Paginate } from "../../types/Paginate.type";
import { PedidoCard } from "../CardPedidoPrincipal/CardPedidoPrincipal";
import { Row, Col, Container } from "react-bootstrap";
import { Loading } from "../Loading/Loading";
import { CardPedido } from "../CardPedido/CardPedido";

const PedidosList: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [paginate, setPaginate] = useState<Paginate>();
    const limit: number = 4;
    const status: string = "pendente";

    /* const apiBaseUrl = 'http://localhost:3000/' */
    const apiBaseUrl = 'https://sg-api-b7fl.onrender.com/'

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
                setPedidos(resp.documentos);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function getPedido(index: number): Pedido {
        return pedidos[index];
    }

    if (pedidos?.length > 0) {
        return (
            <Container fluid={true}>
                <Row style={{ height: '60vh' }}>
                    <Col className="col-6">
                        <CardPedido isPrincipal={true} pedido={getPedido(0)}/>
                    </Col>
                </Row>
                <Row style={{ height: '40vh' }} className="row-cols-3">
                    {pedidos.map((pedido: Pedido, index) => (
                        <Col key={index}>
                            <CardPedido pedido={pedido} />
                        </Col>
                    )).slice(1)}
                </Row>
            </Container>
        );
    } else {
        return (
            <Loading />
        )
    }
};

export default PedidosList;
