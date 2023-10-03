
import { Navigate, Route } from "react-router-dom";

interface PrivateRouteProps {
    user: any;
    redirectPath: string;
    children: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ user, redirectPath = '/', children }) => {
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }
    return children;
};