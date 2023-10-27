import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { PedidosTimeService } from "../../services/PedidosTimeService";
import { PedidoType } from "../../../../../shared/types/PedidoType";
export const ProgressbarPedidoComponent: React.FC<{ pedido: PedidoType }> = ({ pedido }) => {

    const [progress, setProgress] = useState(0);
    const [restante, setRestante] = useState(0);
    const minAnt = 30;

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDateTime = new Date();
            const targetDateTimeObj = new Date(PedidosTimeService.subtractMinutes(pedido.horaDespacho, 10));
            const diffMilliseconds = targetDateTimeObj.getTime() - currentDateTime.getTime();
            const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

            setRestante(diffMinutes);

            if (diffMinutes <= minAnt && diffMinutes >= 0) {
                const percentage = Math.round(((minAnt - diffMinutes) / minAnt) * 100);
                setProgress(percentage);
            } else if (diffMinutes < 0) {
                setProgress(100);
                clearInterval(interval);
            } else {
                setProgress(0);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [pedido.horaDespacho]);

    const variant = progress > 50 ? "danger" : "info";
    const barStyle = {
        height: "12px",
        backgroundColor: "white",
    };

    function transformarEmHorasMinutos(numero: number) {
        const horas = Math.floor(numero / 60);
        const minutos = numero % 60;
        let resultado = '';
        if (horas > 0) {
            resultado += horas === 1 ? '1 hora' : `${horas} horas`;
        }
        if (minutos > 0) {
            resultado += horas > 0 ? ' e ' : '';
            resultado += minutos === 1 ? '1 minuto' : `${minutos} minutos`;
        }
        return resultado === '' ? '0 minutos' : resultado + ' restante';
    }

    return (
        <div>
            <ProgressBar
                now={progress}
                variant={variant}
                className="mx-1"
                style={barStyle}
                striped={progress !== 100}
                animated={progress !== 100}
            />
            {progress === 100 ? (
                <span className="fw-semibold px-1 mt-2 text-danger">Tempo esgotado!</span>
            ) : (
                <span className="fw-semibold px-1 mt-2 ">{transformarEmHorasMinutos(restante)}</span>
            )}
        </div>
    );
}

