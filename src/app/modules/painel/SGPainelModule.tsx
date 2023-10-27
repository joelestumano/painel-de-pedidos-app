import { UseDocumentTitle } from "../../shared/hooks/UseDocumentTitleHook";
import { OffCanvasComponent } from "../../shared/components/off-canvas/OffCanvasComponent";
import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "@rehooks/local-storage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { UsuarioActionTypeEnum } from "../../../redux/usuario/UsuarioActionTypeEnum";
import jwt_decode from "jwt-decode";

export const RequireAuth: React.FC<{ children: any; redirectTo: any }> = ({
    children,
    redirectTo,
}) => {
    const [isToken] = useLocalStorage("access_token");
    const dispatch = useDispatch();
    const userDecoded = isToken ? jwt_decode(isToken) : undefined;

    useEffect(() => {
        dispatch({
            type: UsuarioActionTypeEnum.SET_USUARIO,
            payload: userDecoded,
        });
    }, [dispatch, userDecoded]);

    return isToken ? children : <Navigate to={redirectTo} />;
};

export const SGPainelModule: React.FC<{}> = () => {
    UseDocumentTitle("SG");
    return (
        <>
            <OffCanvasComponent />
            <Outlet />
        </>
    );
};
