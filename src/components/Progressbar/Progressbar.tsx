import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

export const Progressbar: React.FC<{ targetDateTime: string }> = ({ targetDateTime }) => {

    const [progress, setProgress] = useState(0);
    const [restante, setRestante] = useState(0);
    const minAnt = 30;

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDateTime = new Date();
            const targetDateTimeObj = new Date(targetDateTime);
            const diffMilliseconds = targetDateTimeObj.getTime() - currentDateTime.getTime();
            const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

            setRestante(diffMinutes + 1);

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
    }, [targetDateTime]);

    const variant = progress > 50 ? "danger" : "info";
    const barStyle = {
        height: "12px",
        backgroundColor: "white",
    };

    return (
        <div>
            <ProgressBar
                now={progress}
                variant={variant}
                className="mt-1"
                style={barStyle}
            />
            {progress === 100 ? (
                <span className="fw-semibold px-1 mt-2 text-danger">Tempo esgotado!</span>
            ) : (
                <span className="fw-semibold px-1 mt-2">{restante > 1 ? `${restante} min restantes` : `${restante} min restante`}</span>
            )}
        </div>
    );



}
