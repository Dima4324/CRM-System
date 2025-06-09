import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons"
import { Layout, Menu, MenuProps } from "antd"
import { Content } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        label,
        key,
        icon,
        children,
    } as MenuItem;
}

const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    top: 0,
};

const items: MenuItem[] | null = [
    getItem("Личный кабинет", "/profile", <UserOutlined />),
    getItem("Список задач", "/todos", <UnorderedListOutlined />),
];

export const MainAppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuItem = (key: string) => {
        navigate(key);
    };

    return (
        <Layout hasSider>
                <Sider
                    style={siderStyle}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        items={items}
                        onClick={({ key }) => handleMenuItem(key)}
                    />
                </Sider>
                <Content>
                    <Outlet/>
                </Content>
        </Layout>
    )
}