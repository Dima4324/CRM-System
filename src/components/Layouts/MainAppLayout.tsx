import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { SideMenu } from "../SideMenu/SideMenu";

export const MainAppLayout = () => {
    return (
        <Layout hasSider>
            <SideMenu />
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
};
