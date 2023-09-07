import React, { useState, useEffect } from 'react';
import { Pedido } from '../types/Pedido.type';
import { PedidoCard } from './PedidoCard';

const PedidosList: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    useEffect(() => {
        carregarDadosPedidos();
        const eventSource = new EventSource('http://localhost:3000/v1/app/changed-collection');
        eventSource.onmessage = function (event) {
            console.log('sse: ',event)
            carregarDadosPedidos();
        };
        return () => {
            eventSource.close();
        };
    }, []);

    function carregarDadosPedidos() {
        fetch('http://localhost:3000/v1/pedidos/paginate?status=pendente', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
            .then((resp) => {
                setPedidos(resp.documentos)
            }).catch((err) => {
                console.error(err)
            })
    }

    return (
        <div className="container">
            <ul className="list-group">
                {pedidos.length > 0 && pedidos.map((pedido: Pedido, index) => <li key={index} className="list-group-item border-0">
                    <PedidoCard pedido={pedido} />
                </li>)}
            </ul>
        </div>
    );
};

export default PedidosList;