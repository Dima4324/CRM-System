import { useState } from 'react';
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from 'react-router-dom';
import { UnorderedListOutlined, UserOutlined } from '@ant-design/icons';

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

const items: MenuItem[] = [
    getItem("Профиль", "/profile", <UserOutlined />),
    getItem("Список задач", "/", <UnorderedListOutlined />),
];

export const SideMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
        const navigate = useNavigate();
    
        const handleMenuItem = (key: string) => {
            navigate(key);
        };

    return (
        <Sider
            style={siderStyle}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["/"]}
                items={items}
                onClick={({ key }) => handleMenuItem(key)}
            />
        </Sider>
    );
};
