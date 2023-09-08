import "./PedidosList.scss";
import React, { useState, useEffect } from "react";
import { Pedido } from "../../types/Pedido.type";
import { Paginate } from "../../types/Paginate.type";
import { PedidoCard } from "../PedidoCard/PedidoCard";

const PedidosList: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [paginate, setPaginate] = useState<Paginate>();
    const limit: number = 4;
    const status: string = "pendente";

    useEffect(() => {
        carregarDadosPedidos();
        const eventSource = new EventSource(
            `http://localhost:3000/v1/app/changed-collection`
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
            <div className="p-2">

                <div className="row mt-2">
                    <div className="col">
                        <div className="d-flex  justify-content-between">
                            <h4 className="fw-semibold">Pedido {getPedido(0).codigo}</h4>
                            <p className="fw-semibold bg-warning bg-opacity-75 px-2 rounded">{paginate?.totalDocumentos} pedidos até aqui</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <PedidoCard isPrincipal={true} pedido={getPedido(0)}></PedidoCard>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <h4 className="fw-semibold">Próximos pedidos</h4>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                    {pedidos.map((pedido: Pedido, index) => (
                        <div className="col" key={index}>
                            <PedidoCard pedido={pedido}></PedidoCard>
                        </div>
                    )).slice(1)}
                </div>

            </div>
        );
    } else {
        return (
            <div className="p-2 shadow">
                <p className="bg-warning fw-bold text-center m-auto p-2">
                    Nada por aqui!
                </p>
            </div>
        );
    }
};

export default PedidosList;
