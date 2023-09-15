import { useSelector } from "react-redux";
import "./LoadingComponent.scss";

export const LoadingComponent = () => {
    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    return (
        <>
            {isOnline ? (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            ) : <div className="loading-overlay bg-danger bg-opacity-25">
                <div className="loading-spinner"></div>
            </div>}
        </>
    );
};
