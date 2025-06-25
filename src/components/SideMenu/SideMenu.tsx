import { useState } from "react";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router-dom";
import {
    TeamOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../hooks/redux";
import { Roles } from "../../types/admin";

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

export const SideMenu = () => {
    const userRoles = useAppSelector((state) => state.profile.profileInfo?.roles)
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();




    const handleMenuItem = (key: string) => {
        navigate(key);
    };

    const items: MenuItem[] = [
        getItem("Профиль", "/profile", <UserOutlined />),
        getItem("Список задач", "/todos", <UnorderedListOutlined />),
        userRoles?.some(role => role === Roles.ADMIN || role === Roles.MODERATOR) ? getItem("Пользователи", "/users", <TeamOutlined />) : null,
    ];

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
                selectedKeys={[location.pathname]}
                items={items}
                onClick={({ key }) => handleMenuItem(key)}
            />
        </Sider>
    );
};
