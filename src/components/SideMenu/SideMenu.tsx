import { useMemo, useState } from "react";
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

interface SideMenuItem {
    label: React.ReactNode;
    key: React.Key;
    icon?: React.ReactNode;
    children?: MenuItem[];
}

interface EnhancedMenuItem extends SideMenuItem {
    allowedRoles?: Roles[];
}

const isMenuItem = (item: unknown): item is MenuItem => {
    return (
        typeof item === "object" &&
        item !== null &&
        "label" in item &&
        "key" in item
    );
};

const menuItems: EnhancedMenuItem[] = [
    { label: "Профиль", key: "/profile", icon: <UserOutlined /> },
    {
        label: "Список задач",
        key: "/todos",
        icon: <UnorderedListOutlined />,
    },
    {
        label: "Пользователи",
        key: "/users",
        icon: <TeamOutlined />,
        allowedRoles: [Roles.ADMIN, Roles.MODERATOR],
    },
];

const filteredValidItems = menuItems.filter((item) => isMenuItem(item));

const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    top: 0,
};

export const SideMenu = () => {
    const userRoles = useAppSelector(
        (state) => state.profile.profileInfo?.roles
    );
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuItem = (key: string) => {
        navigate(key);
    };

    const availableMenuItems = useMemo(() => {
        return filteredValidItems.filter((item) => {
            if (item.allowedRoles) {
                return userRoles?.some((role) =>
                    item.allowedRoles?.includes(role as Roles)
                );
            } else {
                return true;
            }
        });
    }, [userRoles]);

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
                items={availableMenuItems}
                onClick={({ key }) => handleMenuItem(key)}
            />
        </Sider>
    );
};
