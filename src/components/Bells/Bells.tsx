import { useEffect, useState } from "react";
import "./Bells.scss";
import { Icon } from "../Icon";

export function Bells() {
    const [animate, setAnimate] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (count >= 3) {
                clearInterval(interval);
            } else {
                setAnimate(true);
                setTimeout(() => {
                    setAnimate(false);
                    setCount(prevCount => prevCount + 1);
                }, 500);
            }
        }, 5000);
    }, [count]);

    return (
        <div className="bell-container">
            <Icon iconName="Bell" color="white" size={64} className={`align-top ${animate ? "bell animate" : "bell"}`} />
        </div>
    );
}
