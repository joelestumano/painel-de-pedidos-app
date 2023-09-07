import React, { useState, useEffect } from "react";
import { Pedido } from "../types/Pedido.type";
import { PedidoCard } from "./PedidoCard";

import "./pedidosList.scss";

const PedidosList: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const limit: number = 4;
    const status: string = "pendente";

    useEffect(() => {
        carregarDadosPedidos();
        const eventSource = new EventSource(
            `http://localhost:3000/v1/app/changed-collection`
        );
        eventSource.onmessage = function (event) {
            console.log("sse: ", event);
            carregarDadosPedidos();
        };
        return () => {
            eventSource.close();
        };
    }, []);

    function carregarDadosPedidos() {
        fetch(
            `http://localhost:3000/v1/pedidos/paginate?ativarPaginacao=true&pagina=1&limite=${limit}&status=${status}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((resp) => resp.json())
            .then((resp) => {
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
            <div className="container">

                <div className="d-flex flex-column p-4">

                    <div className="row row-cols-1 row-cols-lg-1">
                        <p className="fw-bold mb-1">Pedido {getPedido(0).codigo}</p>
                    </div>
                    <div className="row row-cols-1 row-cols-lg-1 principal">
                        <div className="col">
                            <PedidoCard isPrincipal={true} pedido={getPedido(0)}></PedidoCard>
                        </div>
                    </div>
                    
                    <div className="row row-cols-1 row-cols-lg-1 mt-4">
                        <p className="fw-bold mb-1">Próximos pedidos</p>
                    </div>
                    <div className="row row-cols-3 row-cols-lg-3">
                        {pedidos
                            .map((pedido: Pedido, index) => (
                                <div className="col" key={index}>
                                    <PedidoCard pedido={pedido}></PedidoCard>
                                </div>
                            )).slice(1)}
                    </div>

                </div>

            </div>
        );
    } else {
        return <div className="container p-2 shadow">
            <p className="bg-warning fw-bold text-center m-auto p-2">Nada por aqui!</p>
        </div>;
    }
};

export default PedidosList;
