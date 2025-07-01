import { Roles } from "../../types/admin";
import { Loader } from "../Loader/Loader";
import { useAppSelector } from "../../hooks/redux";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";

interface ProtectedRouteProps {
    allowedRoles: Roles[];
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    allowedRoles,
    children,
}) => {
    const roles = useAppSelector((state) => state.profile.profileInfo?.roles);

    if (!roles) {
        return <Loader styles={{ height: "80vh" }} />;
    }

    if (!roles.some((role) => allowedRoles.includes(role as Roles))) {
        return <NotFoundPage />;
    }

    return <>{children}</>;
};
