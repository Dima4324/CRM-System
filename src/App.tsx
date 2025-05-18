import { Layout, Menu, MenuProps } from "antd";
import "./App.scss";
import { TodosPage } from "./pages/TodosPage/TodosPage";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import {
    UnorderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

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

const App = () => {
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	
	const handleMenuItem = (key: string) => {
		navigate(key)
	}

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
					onClick={({key}) => handleMenuItem(key)}
                />
            </Sider>
            <Layout style={{ height: "100%" }}>
                <Content>
                    <Routes>
                        <Route path="/profile" element={<ProfilePage/>} />
                        <Route path="/" element={<TodosPage />} />
                        <Route path="*" element={<NotFoundPage/>}></Route>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
