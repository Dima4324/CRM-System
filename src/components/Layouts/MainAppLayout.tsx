import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons"
import { Layout, Menu, MenuProps } from "antd"
import { Content } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

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
    getItem("Профиль", "/profile", <UserOutlined />),
    getItem("Список задач", "/", <UnorderedListOutlined />),
];

export const MainAppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

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
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["/"]}
                        items={items}
                        onClick={({ key }) => handleMenuItem(key)}
                    />
                </Sider>
            <Layout style={{ height: "100%" }}>
                <Content>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}