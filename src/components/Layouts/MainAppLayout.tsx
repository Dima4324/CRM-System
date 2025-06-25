import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SideMenu } from "../SideMenu/SideMenu";
import { useAppSelector } from "../../hooks/redux";
import { Loader } from "../Loader/Loader";
import { isAdmin, isModeretor } from "../../utils/user";

export const MainAppLayout = () => {
    const roles = useAppSelector((state) => state.profile.profileInfo?.roles);
    const location = useLocation();

    if (!roles) {
        return <Loader styles={{ height: "80vh" }} />;
    }

    if (
        !isAdmin(roles) && !isModeretor(roles) &&
        location.pathname.startsWith("/users")
    ) {
        return <Navigate to="/not-found" replace />;
    }

    return (
        <Layout hasSider>
            <SideMenu />
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
};
