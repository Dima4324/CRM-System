import { Layout } from "antd";
import "./App.scss";
import { Content } from "antd/es/layout/layout";
import { RoutesList } from "./shared/RoutesList";
import { SideMenu } from "./components/SideMenu/SideMenu";

const App = () => {
    return (
        <Layout hasSider>
            <SideMenu />
            <Content>
                <RoutesList />
            </Content>
        </Layout>
    );
};

export default App;
